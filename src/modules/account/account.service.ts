import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Account, AccountDocument} from "../../schemas/account.schema";
import {CreateAccountDto} from "./dto/create-account.dto";

@Injectable()
export class AccountService{
    constructor(
        //将 Account 模型注入到server中
        @InjectModel('Account') private accountModel:Model<AccountDocument>
    ) {}
    //新增一个账户
    async create(createAccountDto:CreateAccountDto):Promise<Account>{
        const createdAccount = new this.accountModel(createAccountDto);
        return createdAccount.save()
    }
    //查询所有的账户
    async findAll():Promise<Account[]>{

        return this.accountModel.find().exec()
    }
}