import {Body, Controller, Get, Post} from "@nestjs/common";
import {CreateAccountDto} from "./dto/create-account.dto";
import {AccountService} from "./account.service";
import {Account} from "../../schemas/account.schema";
import {Response, ResponseCode} from "../../common/common.interface";

@Controller('account')
export class AccountController{
    constructor(private readonly accountServer:AccountService) {
    }
    @Post('create')
    async create(@Body() createAccountDto: CreateAccountDto): Promise<Response<Account>> {
        const response =await this.accountServer.create(createAccountDto);
        return {
            code:ResponseCode.success,
            message:`新增成功`,
            data:response,
        }
    }

    @Get('findAll')
    async getAll(): Promise<Response<Account[]>> {
        const response =await this.accountServer.findAll();
        return {
            code: ResponseCode.success,
            message: "查询成功",
            data:response
        }
    }
}