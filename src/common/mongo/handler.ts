import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { DB_CONSTANTS } from './constants';

export const rootMongooseModule = () =>
  MongooseModule.forRootAsync({
    connectionName: DB_CONSTANTS.DEFAULT,
    useFactory: async (config: ConfigService) => {
      return {
        dbName: 'bucket',
        uri: config.get('MONGO_URI')
      };
    },
    inject: [ConfigService],
  });
