import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import { AccountService } from './account.service';
import { Account } from '../../schemas/account.schema';
import { ExceptionStatus } from '../../common/common.interface';
import { CacheService } from '../../cache/cache.service';
import { enCrypt, enCryptCompare } from '../../utils/help';
import { AuthorityService } from '../authority/authority.service';
import { AccountEntity } from './entity/account-entity';
import { AuthService } from '../../auth/auth.service';
import { RedisKey } from '../../config/redis.config';
import { AccountControllerPath, Route } from '../../utils/route';
import { CosService } from '../../cos/cos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileEntity } from '../../cos/entity/file-entity';
import { TenXunBucket, TenXunFileFold, TenXunRegion } from '../../cos/type';
import { CreateBankDto } from './dto/create-bank.dto';
import { Bank } from '../../schemas/bank.schema';
import { BankEntity } from './entity/bank-entity';

@Controller(Route.account)
export class AccountController {
  constructor(
    private readonly accountService: AccountService, //private readonly cacheService: CacheService,
    private readonly authorityService: AuthorityService, //private readonly authService: AuthService,
    private readonly authService: AuthService,
    private readonly cacheService: CacheService,
    private readonly cosService: CosService,
  ) {}

  /**
   * todo 新增账户
   * @param createAccountDto
   */
  @Post(AccountControllerPath.create)
  async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    const {
      accountNickname,
      accountUsername,
      accountPassword,
    } = createAccountDto;
    await checkRegisterParams(
      this.accountService,
      accountNickname,
      accountUsername,
    );
    const account = this.accountService.create({
      ...createAccountDto,
      accountPassword: enCrypt(accountPassword),
    });
    if (account) {
      return account;
    }
  }

  /**
   * todo 登录
   * @param loginAccountDto
   */
  @Post(AccountControllerPath.login)
  async login(
    @Body() loginAccountDto: LoginAccountDto,
  ): Promise<AccountEntity> {
    const { accountPassword, accountUsername } = loginAccountDto;
    //查询用户
    const account = await this.accountService.findOneByAccountUsername(
      accountUsername,
      true,
    );
    if (account) {
      if (!enCryptCompare(account.accountPassword, accountPassword)) {
        throw new HttpException(
          {
            code: ExceptionStatus.PASSWORD_ERROR,
            message: '密码错误',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        {
          code: ExceptionStatus.NOT_FIND,
          message: '该用户不存在',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    //查询用户的权限详情
    const authority = await this.authorityService.findAuthorityByLevel(
      account.authorityLevel,
    );
    if (!authority) {
      throw new HttpException(
        {
          code: ExceptionStatus.NOT_FIND,
          message: '该用户权限异常',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await this.authService.genAccountToken(account);
    const loginUser: AccountEntity = {
      id: account.id,
      authorityLevel: account.authorityLevel,
      email: account.email,
      phone: account.phone,
      accountUsername: account.accountUsername,
      accountNickname: account.accountNickname,
      accountPassword: account.accountPassword,
      authority: {
        id: authority.id,
        name: authority.authorityName,
        description: authority.authorityDescription,
        level: authority.authorityLevel,
      },
      token: token,
    };
    await updateToken(this.cacheService, loginUser);
    return loginUser;
  }

  /**
   * todo 新增一条银行记录
   * @param createBankDto
   */
  @Post(AccountControllerPath.createBank)
  async createBank(@Body() createBankDto: CreateBankDto): Promise<Bank> {
    return this.accountService.createBank(createBankDto);
  }

  /**
   * todo 查询所有的银行
   */
  @Get(AccountControllerPath.find_all_bank)
  async findAllBank(): Promise<BankEntity[]> {
    const banks: Bank[] = await this.accountService.findAllBank();
    return banks.map((bank) => {
      return {
        id: bank.id,
        bankName: bank.bankName,
        bankDescription: bank.bankDescription,
        bankImage: bank.bankImage,
      };
    });
  }

  @Get(AccountControllerPath.fetch_account_info)
  async fetchAccountInfo(@Request() request): Promise<AccountEntity> {
    console.log(request.headers.token);
    const token = request.headers.token;
    if (token) {
      return await this.cacheService.hGet(RedisKey.accounts, token);
    } else {
      throw new HttpException(
        {
          code: ExceptionStatus.NOT_FIND,
          message: '该用户不存在',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  //查询所有账户
  @Get(AccountControllerPath.find_all)
  async getAll(): Promise<Account[]> {
    return await this.accountService.findAll();
  }

  @Get('getImages')
  async getImages(): Promise<any> {
    //return await this.cosService.getService();
    return await this.cosService.getFileList();
  }
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: FileEntity,
    @Body() uploadObject,
  ): Promise<any> {
    return await this.cosService.uploadFile(
      TenXunBucket.image,
      TenXunRegion.nanJin,
      TenXunFileFold.user,
      file.originalname,
      file.buffer,
      (onProgress) => {
        console.log(onProgress);
      },
    );
  }
}

/**
 * todo 检查昵称和用户名是否重复
 * @param service
 * @param accountNickname
 * @param accountUsername
 */
async function checkRegisterParams(
  service: AccountService,
  accountNickname: string,
  accountUsername: string,
): Promise<void> {
  const accountByNickname: Account | null = await service.findOneByAccountNickname(
    accountNickname,
  );
  if (accountByNickname) {
    throw new HttpException(
      {
        code: ExceptionStatus.CREATE_FAILED,
        message: '该用昵称已存在',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
  const accountByUsername: Account | null = await service.findOneByAccountUsername(
    accountUsername,
  );
  if (accountByUsername) {
    throw new HttpException(
      {
        code: ExceptionStatus.CREATE_FAILED,
        message: '该用用户名已存在',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

/**
 * todo 用来先检查redis是否存在之前的token，存在就删除不存在直接添加
 * @param cacheService
 * @param loginAccount
 */
async function updateToken(
  cacheService: CacheService,
  loginAccount: AccountEntity,
) {
  const data = await cacheService.hValues(RedisKey.accounts);
  for (let i = 0; i < data.length; i++) {
    const account = JSON.parse(data[i]) as AccountEntity;
    if (account.id === loginAccount.id) {
      await cacheService.hDelete(RedisKey.accounts, account.token);
      break;
    }
  }
  await cacheService.hSet(RedisKey.accounts, loginAccount.token, loginAccount);
}
