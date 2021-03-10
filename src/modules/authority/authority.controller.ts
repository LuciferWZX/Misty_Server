import { Authority } from '../../schemas/authority.schema';
import { AuthorityService } from './authority.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthorityDto } from './dto/create-authority.dto';

@Controller('authority')
export class AuthorityController {
  constructor(private readonly authorityService: AuthorityService) {}

  @Post('create')
  async create(
    @Body() createAuthorityDto: CreateAuthorityDto,
  ): Promise<Authority> {
    return this.authorityService.create(createAuthorityDto);
  }
}
