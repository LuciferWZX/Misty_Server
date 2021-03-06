import { Injectable, Logger } from '@nestjs/common';
import orcClientConfig from 'src/config/ocr.config';
import cosOption from '../config/cos.config';
import {
  TenXunBucket,
  TenXunFileFold,
  TenXunRegion,
  UploadProgressType,
} from './type';
import { Client } from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_client';
import {
  IDCardOCRRequest,
  IDCardOCRResponse,
} from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_models';

@Injectable()
export class CosService {
  private cosClient: any;

  private ocrClient: Client;
  constructor() {
    this.initCosClient().then();
    this.initOrcClient().then();
  }
  //todo 文件上传client初始化
  private async initCosClient() {
    const COS = require('cos-nodejs-sdk-v5');
    this.cosClient = new COS(cosOption);
  }
  //todo 身份证识别client初始化
  private async initOrcClient() {
    const tencentCloud = require('tencentcloud-sdk-nodejs');
    const OCR = tencentCloud.ocr.v20181119.Client;
    this.ocrClient = new OCR(orcClientConfig);
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
  public async getFileList(
    bucket: TenXunBucket = TenXunBucket.image,
    region: TenXunRegion = TenXunRegion.nanJin,
    fold?: TenXunFileFold,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cosClient.getBucket(
        {
          Bucket: bucket /* 必须 */,
          Region: region /* 必须 */,
          Marker: fold /* 非必须 */,
        },
        function (err, data) {
          if (err) {
            Logger.error(`${bucket}查询失败`);
            reject(err);
          }
          if (data) {
            Logger.log(`${bucket}查询成功`);
            resolve(data);
          }
        },
      );
    });
  }

  /**
   * todo 上传文件到腾讯的对象存储
   * @param bucket
   * @param region
   * @param fold
   * @param fileName
   * @param buffer
   * @param onProgress
   */
  public async uploadFile(
    bucket: TenXunBucket = TenXunBucket.image,
    region: TenXunRegion = TenXunRegion.nanJin,
    fold: TenXunFileFold,
    fileName: string,
    buffer: Buffer | File | undefined,
    onProgress?: (onProgress: UploadProgressType) => void,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cosClient.putObject(
        {
          Bucket: bucket /* 必须 */,
          Region: region /* 必须 */,
          Key: `${fold}${fileName}`,
          Body: buffer, // 上传文件对象
          onProgress: function (progressData: UploadProgressType) {
            Logger.warn('文件上传的进度：' + progressData.percent);
            onProgress?.(progressData);
          },
        },
        function (err, data) {
          if (err) {
            Logger.error(`${fileName}上传失败`);
            reject(err);
          }
          if (data) {
            Logger.log(`${fileName}上传成功`);
            resolve(data);
          }
        },
      );
    });
  }

  /**
   * todo 识别身份证
   * @param params
   */
  public async idCardOrc(params: IDCardOCRRequest): Promise<IDCardOCRResponse> {
    return new Promise((resolve, reject) => {
      this.ocrClient.IDCardOCR(params).then(
        (data) => {
          resolve(data);
        },
        (err) => {
          Logger.error(err);
          reject(err);
        },
      );
    });
  }
}
