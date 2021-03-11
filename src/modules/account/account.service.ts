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
  //新增一个账户
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  /**
   * 根据用户名查找
   * @param accountUsername
   * @param needPassword （是否显示密码）
   */
  async findOneByAccountUsername(
    accountUsername: string,
    needPassword?: boolean,
  ): Promise<Account> {
    return this.accountModel.findOne(
      { accountUsername: accountUsername },
      needPassword ? {} : { accountPassword: 0 },
    );
  }

  /**
   * todo
   * 根据账户昵称查找（不显示密码）
   * @param accountNickname
   */
  async findOneByAccountNickname(accountNickname: string): Promise<Account> {
    return this.accountModel
      .findOne({ accountNickname: accountNickname }, { accountPassword: 0 })
      .lean();
  }
  //查询所有的账户
  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }
}
