import {Module} from "@nestjs/common";
import {RedisModule} from "nestjs-redis";
import redisOption from "../config/redis.config";
import {CacheService} from "./cache.service";

@Module({
    imports: [
        RedisModule.register(redisOption),
    ],
    providers:[
        CacheService
    ]
})
export class CacheModule{}