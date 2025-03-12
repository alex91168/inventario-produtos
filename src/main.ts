import { NestFactory } from '@nestjs/core';
import { productModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(productModule);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
