import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import { AccountService } from './account.service';
import { Account } from '../../schemas/account.schema';
import { ExceptionStatus } from '../../common/common.interface';
//import { CacheService } from '../../cache/cache.service';
import { enCrypt, enCryptCompare } from '../../utils/help';
import { AuthorityService } from '../authority/authority.service';
import { AccountEntity } from './entity/account-entity';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService, //private readonly cacheService: CacheService,
    private readonly authorityService: AuthorityService,
  ) {}

  /**
   * todo
   * 新增账户
   * @param createAccountDto
   */
  @Post('create')
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
   * todo
   * 登录
   * @param loginAccountDto
   */
  @Post('login')
  async logo(@Body() loginAccountDto: LoginAccountDto): Promise<AccountEntity> {
    const { accountPassword, accountUsername } = loginAccountDto;
    //查询用户
    const account: Account | null = await this.accountService.findOneByAccountUsername(
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
    return {
      ...account,
      authority: {
        id: authority.id,
        name: authority.authorityName,
        description: authority.authorityDescription,
        level: authority.authorityLevel,
      },
    };
  }
  //查询所有账户
  @Get('findAll')
  async getAll(): Promise<Account[]> {
    return await this.accountService.findAll();
  }
}

/**
 * todo
 * 检查昵称和用户名是否重复
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
