import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from '../../schemas/account.schema';
import { CreateAccountDto } from './dto/create-account.dto';
import { Bank, BankDocument } from '../../schemas/bank.schema';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class AccountService {
  constructor(
    //将 Account 模型注入到server中
    @InjectModel('Account') private accountModel: Model<AccountDocument>,
    @InjectModel('Bank') private bankModel: Model<BankDocument>,
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
   * todo 根据账户昵称查找（不显示密码）
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
  /**
   * todo 新增一个银行卡记录
   * @param createBankDto
   */
  async createBank(createBankDto: CreateBankDto): Promise<Bank> {
    const createBank = new this.bankModel(createBankDto);
    return createBank.save();
  }

  /**
   * todo 查询所有的银行列表
   */
  async findAllBank(): Promise<Bank[]> {
    return this.bankModel.find().exec();
  }
}
