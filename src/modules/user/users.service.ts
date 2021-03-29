import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    //将 User 模型注入到server中
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  /**
   * 新增一条用户信息
   * @param user
   */
  async create(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}
