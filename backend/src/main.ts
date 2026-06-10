import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NBA Project API')
    .setDescription('NBA player and team management API. Part of a Full Stack application. Provides endpoints for managing players and teams, including fetching, updating, and soft deleting records. Also includes cron jobs for data synchronization with balldontlie API.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
