import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Authority, AuthorityDocument } from '../../schemas/authority.schema';
import { CreateAuthorityDto } from './dto/create-authority.dto';

@Injectable()
export class AuthorityService {
  constructor(
    //将 Authority 模型注入到server中
    @InjectModel('Authority') private authorityModel: Model<AuthorityDocument>,
  ) {}

  /**todo
   * 向权限表新增一条记录
   * @param createAuthorityDto
   */
  async create(createAuthorityDto: CreateAuthorityDto) {
    const createAuthority = new this.authorityModel(createAuthorityDto);
    return createAuthority.save();
  }
  async findAuthorityByLevel(level: number): Promise<Authority> {
    return this.authorityModel.findOne({ authorityLevel: level });
  }
}
