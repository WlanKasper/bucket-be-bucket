import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });

  const port = 8080;

  await app.listen(port);
};

bootstrap();
