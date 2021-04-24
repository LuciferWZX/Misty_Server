import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from '../../schemas/account.schema';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    //将 Account 模型注入到server中
    @InjectModel('Account') private accountModel: Model<AccountDocument>,
  ) {}

  /**
   * todo 新增一个账户
   * @param createAccountDto
   */
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  /**
   * todo 根据用户名查找
   * @param username
   * @param needPassword （是否显示密码）
   */
  async findOneByAccountUsername(
    username: string,
    needPassword?: boolean,
  ): Promise<Account> {
    return this.accountModel.findOne(
      { username: username },
      needPassword ? {} : { accountPassword: 0 },
    );
  }

  /**
   * todo 根据邮箱查找
   * @param email
   * @param needPassword
   */
  async findOneByAccountEmail(
    email: string,
    needPassword?: boolean,
  ): Promise<Account> {
    return this.accountModel.findOne(
      { email: email },
      needPassword ? {} : { accountPassword: 0 },
    );
  }
  /**
   * todo 根据账户昵称查找（不显示密码）
   * @param nickname
   */
  async findOneByAccountNickname(nickname: string): Promise<Account> {
    return this.accountModel
      .findOne({ nickname: nickname }, { accountPassword: 0 })
      .lean();
  }
  //查询所有的账户
  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }
}
