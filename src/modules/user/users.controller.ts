import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UsersController {
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): string {
    return `login username:${loginUserDto.username}`;
  }
}
