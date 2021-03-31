import { COSOptions } from 'cos-nodejs-sdk-v5';
import TenXun from './sign.config';

const cosOption: COSOptions = {
  SecretId: TenXun.secretId, // 替换为你的SecretId
  SecretKey: TenXun.secretKey, // 替换为你的SecretKey
};
export default cosOption;
