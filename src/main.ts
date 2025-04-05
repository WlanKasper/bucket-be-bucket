import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<string>('PORT') || 8080;

  await app.listen(port);
};

bootstrap();
