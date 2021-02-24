import {Body, Controller, Get, HttpException, HttpStatus, Post} from "@nestjs/common";
import {CreateAccountDto} from "./dto/create-account.dto";
import {AccountService} from "./account.service";
import {Account} from "../../schemas/account.schema";
import {ExceptionStatus} from "../../common/common.interface";

@Controller('account')
export class AccountController{
    constructor(private readonly accountServer:AccountService) {
    }
    //新增账户
    @Post('create')
    async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
        const {accountName}=createAccountDto
        const account:Account|null = await this.accountServer.findOneByAccountName(accountName)
        if(account){
            throw new HttpException({
                code: ExceptionStatus.CREATE_ACCOUNT_FAILED,
                message: '该用户名已存在',
            }, HttpStatus.FOUND );
        }
        const response:Account =await this.accountServer.create(createAccountDto);
        if(response){
            return response
        }


    }
    //查询所有账户
    @Get('findAll')
    async getAll(): Promise<Account[]> {
        return await this.accountServer.findAll()
    }
}