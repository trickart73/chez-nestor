import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const configSwagger = new DocumentBuilder()
    .setTitle('Chez Nestor API')
    .setDescription('Technical Test for interview')
    .setVersion('1.0')
    .addTag('nestor')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
