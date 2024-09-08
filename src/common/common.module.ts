import { Module } from '@nestjs/common';
import { rootMongooseModule } from './mongo/handler';

@Module({
  imports: [rootMongooseModule()],
})
export class CommonModule {}
