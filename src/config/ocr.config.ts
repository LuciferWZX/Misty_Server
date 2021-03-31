import { ClientConfig } from 'tencentcloud-sdk-nodejs/src/common/interface';
import TenXun from './sign.config';
import { TenXunRegion } from '../cos/type';

const orcClientConfig: ClientConfig = {
  credential: {
    secretId: TenXun.secretId,
    secretKey: TenXun.secretKey,
  },
  region: TenXunRegion.shangHai,
  profile: {
    httpProfile: {
      endpoint: TenXun.endPoint,
    },
  },
};
export default orcClientConfig;
