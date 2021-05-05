import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SubareaChildrenDocument } from '../../schemas/SubareaChildren.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SubareaParentDocument } from '../../schemas/subareaParent.schema';
import { CreateSubareaParentDto } from './dto/create-subareaParent.dto';
import { CreateSubareaChildrenDto } from './dto/create-subareaChildren.dto';
import { SubareaParentEntity } from './dto/SubareaParentEntity';
import { SubareaEntity } from './dto/SubareaEntity';
import { SubareaChildrenEntity } from './dto/SubareaChildrenEntity';

@Injectable()
export class SubareaService {
  constructor(
    @InjectModel('SubareaParent')
    private subareaParentModel: Model<SubareaParentDocument>,
    @InjectModel('SubareaChildren')
    private subareaChildrenModel: Model<SubareaChildrenDocument>,
  ) {}
  //@todo 创建父分区的数据
  async createSubareaParent(createSubareaParentDto: CreateSubareaParentDto) {
    const subareaParent = new this.subareaParentModel(createSubareaParentDto);
    return subareaParent.save();
  }
  //@todo 创建子分区的数据
  async createSubareaChildren(
    createSubareaChildrenDto: CreateSubareaChildrenDto,
  ) {
    const subareaChildren = new this.subareaChildrenModel(
      createSubareaChildrenDto,
    );
    return subareaChildren.save();
  }
  //@todo 查询所有的tag
  async queryAllSubarea(): Promise<SubareaEntity[]> {
    const parentSubarea: SubareaParentDocument[] = await this.subareaParentModel.find();
    const childrenSubarea: SubareaChildrenDocument[] = await this.subareaChildrenModel.find();
    let subareas: SubareaEntity[] = [];
    subareas = parentSubarea.map((parentSB) => {
      return {
        id: parentSB.id,
        label: parentSB.label,
        desc: parentSB.desc,
        children: childrenSubarea
          .filter((childrenSB) => childrenSB.parentId === parentSB.id)
          .map((childrenSB) => {
            return {
              id: childrenSB.id,
              label: childrenSB.label,
              desc: childrenSB.desc,
            };
          }),
      };
    });
    return subareas;
  }
}
