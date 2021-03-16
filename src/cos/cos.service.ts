import { Injectable, Logger } from '@nestjs/common';
import cosOption from '../config/cos.config';
@Injectable()
export class CosService {
  private cosClient: any;
  constructor() {
    this.initCosClient().then();
  }
  private async initCosClient() {
    const COS = require('cos-nodejs-sdk-v5');
    this.cosClient = new COS(cosOption);
  }
  //查询存储桶列表
  public async getService(): Promise<void> {
    if (!this.cosClient) {
      await this.initCosClient();
    }
    return new Promise((resolve, reject) => {
      this.cosClient.getService(async function (err, data): Promise<any> {
        if (err) {
          Logger.error(err);
          reject(err);
        }
        if (data) {
          console.log(data && data.Buckets);
          resolve(data);
        }
      } as any);
    });
  }
  //列出目录 user 的所有文件
  public async getFileList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cosClient.getBucket(
        {
          Bucket: 'image-1257846935' /* 必须 */,
          Region: 'ap-nanjing' /* 必须 */,
          Prefix: 'user/' /* 非必须 */,
          Delimiter: '/',
        },
        function (err, data) {
          if (err) {
            reject(err);
          }
          if (data) {
            resolve(data.Contents);
          }
        },
      );
    });
  }
}
