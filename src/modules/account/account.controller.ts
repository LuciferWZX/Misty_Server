import {Body, Controller, Get, HttpException, HttpStatus, Post} from "@nestjs/common";
import {CreateAccountDto} from "./dto/create-account.dto";
import {LoginAccountDto} from "./dto/login-account.dto";
import {AccountService} from "./account.service";
import {Account} from "../../schemas/account.schema";
import {ExceptionStatus} from "../../common/common.interface";
import {CacheService} from "../../cache/cache.service";
import {RedisKey} from "../../config/redis.config";



@Controller('account')
export class AccountController{
    constructor(
        private readonly accountService:AccountService,
        private readonly cacheService:CacheService
    ) {
    }

    //新增账户
    @Post('create')
    async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
        const {accountName}=createAccountDto
        const account:Account|null = await this.accountService.findOneByAccountName(accountName)
        if(account){
            throw new HttpException({
                code: ExceptionStatus.CREATE_ACCOUNT_FAILED,
                message: '该用户名已存在',
            }, HttpStatus.FOUND );
        }
        const response:Account =await this.accountService.create(createAccountDto);
        if(response){
            return response
        }


    }
    @Post('login')
    async logo(@Body() loginAccountDto:LoginAccountDto):boolean{
        const {accountPassword,accountUsername}=loginAccountDto

    }
    //查询所有账户
    @Get('findAll')
    async getAll(): Promise<Account[]> {
        return await this.accountService.findAll()
    }
}