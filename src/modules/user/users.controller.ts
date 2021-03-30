import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Route, UserControllerPath } from '../../utils/route';
import { UsersService } from './users.service';
import { CacheService } from '../../cache/cache.service';
import { RedisKey } from '../../config/redis.config';
import { AccountEntity } from '../account/entity/account-entity';
import { ExceptionStatus } from '../../common/common.interface';
import { UserEntity } from './entity/user-entity';
import { CosService } from '../../cos/cos.service';
import {
  TenXunBucket,
  TenXunFileFold,
  TenXunRegion,
  UploadResponseType,
  UploadStatus,
} from '../../cos/type';
import { getFileSuffix } from '../../utils/help';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileEntity } from '../../cos/entity/file-entity';
import { User } from '../../schemas/user.schema';

@Controller(Route.user)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cacheService: CacheService,
    private readonly cosService: CosService,
  ) {}

  /**
   * todo 新建用户信息
   * @param files
   * @param user
   * @param token
   */
  @Post(UserControllerPath.create)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idPicture', maxCount: 1 },
      { name: 'workerPicture', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles() files: FileEntity[],
    @Body() user: UserEntity,
    @Headers('token') token: string,
  ): Promise<any> {
    //todo 通过token查找操作的账户，插入数据
    const actionAccount: AccountEntity = await this.cacheService.hGet(
      RedisKey.accounts,
      token,
    );
    if (!actionAccount) {
      throw new HttpException(
        {
          code: ExceptionStatus.NOT_FIND,
          message: '未找到该账户的信息，禁止操作',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    let workerPicturePath = '';
    let idPicturePath = '';
    //todo 面部上传
    {
      const workerPictureResponse: UploadResponseType = await this.cosService.uploadFile(
        TenXunBucket.image,
        TenXunRegion.nanJin,
        TenXunFileFold.user,
        `${user.workId}_wpp_.${getFileSuffix(
          files['workerPicture'][0].originalname,
        )}`,
        files['workerPicture'][0].buffer,
      );
      if (workerPictureResponse.statusCode === UploadStatus.success) {
        workerPicturePath = `${user.workId}_wpp_.${getFileSuffix(
          files['workerPicture'][0].originalname,
        )}`;
      }
    }
    //todo 身份证上传
    {
      const idPictureResponse: UploadResponseType = await this.cosService.uploadFile(
        TenXunBucket.image,
        TenXunRegion.nanJin,
        TenXunFileFold.user,
        `${user.workId}_ipp_.${getFileSuffix(
          files['idPicture'][0].originalname,
        )}`,
        files['idPicture'][0].buffer,
      );
      if (idPictureResponse.statusCode === UploadStatus.success) {
        idPicturePath = `${user.workId}_ipp_.${getFileSuffix(
          files['idPicture'][0].originalname,
        )}`;
      }
    }
    //todo 返回结果
    return await this.usersService.create({
      ...user,
      workerPicture: workerPicturePath,
      idPicture: idPicturePath,
      createdId: actionAccount.id,
    });
  }

  // todo 查看用户字段是否有重复
  @Get(UserControllerPath.isUsed)
  async isUsed(
    @Query('key') key: [keyof User],
    @Query('value') value: any,
  ): Promise<boolean> {
    const user = await this.usersService.findOne(key, value);
    return !!user;
  }
}
