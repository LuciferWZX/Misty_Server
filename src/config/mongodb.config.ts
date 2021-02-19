import {MongooseModuleOptions} from "@nestjs/mongoose";

interface MongodbConfig{
    url:string,
    options?:MongooseModuleOptions
}
const mongodbConfig:MongodbConfig={
    url:'mongodb://localhost/db_misty',
}
export default mongodbConfig