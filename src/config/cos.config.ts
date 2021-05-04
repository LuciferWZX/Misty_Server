import { COSOptions } from 'cos-nodejs-sdk-v5';
import TenXun from './sign.config';

const cosOption: COSOptions = {
  SecretId: TenXun.secretId, // 替换为你的SecretId
  SecretKey: TenXun.secretKey, // 替换为你的SecretKey
};
const appId = '1257846935';
export default cosOption;
export { appId };
