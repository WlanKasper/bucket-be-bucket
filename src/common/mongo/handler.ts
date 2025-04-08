import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { DB_CONSTANTS } from './constants';

export const rootMongooseModule = () =>
  MongooseModule.forRootAsync({
    connectionName: DB_CONSTANTS.DEFAULT,
    useFactory: async (config: ConfigService) => {
      console.log(config.get('MONGO_URI'));

      return {
        dbName: 'todozy_db',
        uri: config.get('MONGO_URI')
      };
    },
    inject: [ConfigService],
  });
