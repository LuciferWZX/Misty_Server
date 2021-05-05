import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubareaParent,
  SubareaParentSchema,
} from '../../schemas/subareaParent.schema';
import {
  SubareaChildren,
  SubareaChildrenSchema,
} from '../../schemas/SubareaChildren.schema';
import { SubareaService } from './subarea.service';
import { SubareaController } from './subarea.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubareaParent.name, schema: SubareaParentSchema },
      { name: SubareaChildren.name, schema: SubareaChildrenSchema },
    ]),
  ],
  controllers: [SubareaController],
  providers: [SubareaService],
})
export class SubareaModule {}
