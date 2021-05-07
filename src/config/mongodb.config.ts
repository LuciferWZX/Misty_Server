import { MongooseModuleOptions } from '@nestjs/mongoose';

interface MongodbConfig {
  url: string;
  options?: MongooseModuleOptions;
}
const mongodbConfig: MongodbConfig = {
  url: 'mongodb://localhost:27017/db_we_media',
  options: {
    useCreateIndex: true,
    useFindAndModify: false,
  },
};
export default mongodbConfig;
