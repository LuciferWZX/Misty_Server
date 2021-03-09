import {RedisModuleOptions} from "nestjs-redis";
import {Logger} from "@nestjs/common";
export enum RedisMessage{
    ready='ready',
    end='end',
    error='error',
    connect='connect',
    message='message',
}
export enum RedisKey{
    users='users',
    test='test',
    expiredSubKey='__keyevent@${0}__:expired'
}
const redisOption:RedisModuleOptions = {
    port: 6379,
    host: '127.0.0.1',
    password: '',
    db:0,
    onClientReady:async function (client):Promise<void>{
        client.on(RedisMessage.ready, () => {
            Logger.log('redis已准备')
        })
        client.on(RedisMessage.end, (err) => {
            Logger.error('redis结束:'+err)
        })
        client.on(RedisMessage.connect, () => {
            Logger.log('redis已连接')
            //client.send_command('config', ['set', 'notify-keyspace-events', 'Ex'],subExpired);
        })

        client.on(RedisMessage.error, (err) => {
            Logger.error(err)
        })
    },
}

export default redisOption