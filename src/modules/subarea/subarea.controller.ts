import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Route, SubareaControllerPath } from '../../utils/route';
import { SubareaService } from './subarea.service';
import { CreateSubareaParentDto } from './dto/create-subareaParent.dto';
import { CreateSubareaChildrenDto } from './dto/create-subareaChildren.dto';
import { SubareaChildrenEntity } from './dto/SubareaChildrenEntity';
import { SubareaParentDocument } from '../../schemas/subareaParent.schema';
import { SubareaEntity } from './dto/SubareaEntity';

@Controller(Route.subarea)
export class SubareaController {
  constructor(private readonly subareaService: SubareaService) {}

  /**
   * @todo 创建父分区
   * @param createSubareaParentDto
   */
  @HttpCode(HttpStatus.OK)
  @Post(SubareaControllerPath.create_parent)
  async createSubareaParent(
    @Body() createSubareaParentDto: CreateSubareaParentDto,
  ): Promise<SubareaParentDocument> {
    return this.subareaService.createSubareaParent(createSubareaParentDto);
  }
  /**
   * @todo 创建子分区
   * @param createSubareaChildrenDto
   */
  @HttpCode(HttpStatus.OK)
  @Post(SubareaControllerPath.create_children)
  async createSubareaChildren(
    @Body() createSubareaChildrenDto: CreateSubareaChildrenDto,
  ): Promise<SubareaChildrenEntity> {
    return this.subareaService.createSubareaChildren(createSubareaChildrenDto);
  }

  /**
   * @todo 查询全部的分区
   */
  @Get(SubareaControllerPath.query_subarea)
  async getSubarea(): Promise<SubareaEntity[]> {
    return await this.subareaService.queryAllSubarea();
  }
}
