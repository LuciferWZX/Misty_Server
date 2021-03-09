import {RedisService} from "nestjs-redis";
import * as Redis from "ioredis";
import {Injectable} from "@nestjs/common";
import {RedisKey} from "../config/redis.config";

@Injectable()
export class CacheService{
    private client:Redis.Redis;
    constructor(private redisService:RedisService) {
        this.getClient().then()
    }
    private async getClient(){
        this.client = await this.redisService.getClient()
    }


    /**
     * @Description: 封装设置redis缓存的方法
     * @param key {String} key值
     * @param value {String} key的值
     * @param seconds {Number} 过期时间
     * @return: Promise<any>
     */
    public async set(key: RedisKey, value: any, seconds?: number): Promise<any> {
        value = JSON.stringify(value);
        if (!this.client) {
            await this.getClient();
        }
        if (!seconds) {
            await this.client.set(key, value);
        } else {
            await this.client.set(key, value, 'EX', seconds);
        }
    }
    /**
     * @desc: 设置获取redis缓存中的值
     * @param key {RedisKey}
     */
    public async get(key:RedisKey):Promise<any>{
        if(!this.client){
            await this.getClient()
        }
        const data:any = await this.client.get(key as string);
        console.log(111111,data)
        // if(data){
        //     return JSON.parse(data)
        // }
        return null
    }

    /**
     * @desc 获取hashmap 里面的所有键
     * @param key
     */
    public async hKeys(key:RedisKey):Promise<string[]>{
        if(!this.client){
            await this.getClient()
        }
        return await this.client.hkeys(key as string)
    }

    /**
     * @desc 获取hashmap里面的某个键的值
     * @param key
     * @param fieldKey
     */
    public async hGet(key:RedisKey,fieldKey:string):Promise<any>{
        if(!this.client){
            await this.getClient()
        }
        return await this.client.hget(key,fieldKey);
    }
    /**
     * @desc 设置过期时间
     * @param key {RedisKey}
     * @param seconds {number}
     */
    public async setExpire(key:RedisKey,seconds:number){
        if (!this.client) {
            await this.getClient();
        }
        await this.client.expire(key,seconds)
    }

    /**
     * @Description: 根据key删除redis缓存数据
     * @param key {String}
     * @return:
     */
    public async del(key: string): Promise<any> {
        if (!this.client) {
            await this.getClient();
        }

        await this.client.del(key);
    }
    /**
     * @Description: 清空redis的缓存
     * @return:
     */
    public async flushAll(): Promise<any> {
        if (!this.client) {
            await this.getClient();
        }

        await this.client.flushall();
    }

}