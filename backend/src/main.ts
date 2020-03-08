import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common'; 
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || config.get('server.port');
  await app.listen(port);

  logger.verbose(`Application listening on port ${ port }`)

}
bootstrap();
