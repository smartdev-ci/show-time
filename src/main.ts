import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  hbs.registerPartials(join(__dirname, '..', 'src/views/layouts'));
  app.setViewEngine('hbs');

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
