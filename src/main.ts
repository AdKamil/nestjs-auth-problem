// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Targi Hybrydowe Api')
    .setVersion('0.0.1')
    .addTag('th')
    .build()

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT)
}
bootstrap();
