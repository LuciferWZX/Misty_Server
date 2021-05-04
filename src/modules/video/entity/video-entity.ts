import { VideoEditStatus } from '../../../common/common.interface';

export class VideoEntity {
  id: string;
  videoDesc?: string;
  videoImage?: string;
  videoTags?: string[];
  videoTitle: string;
  uploaderId?: string;
  editStatus: VideoEditStatus;
}
