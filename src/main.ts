import { NestFactory } from '@nestjs/core';
import { ProductModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.enableCors({
    origin: '*',
    methosd: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true  
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
