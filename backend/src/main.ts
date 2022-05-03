import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';


const allowList = ['http://localhost:8081'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors({
    origin: allowList,
    credentials: true
  });
  app.setGlobalPrefix("/api");
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle("Nestjs Demo Api")
    .setDescription("The nest js demo api swagger ui.")
    .setVersion("1.0")
    .addTag("Nestjs-demo")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);



  await app.listen(3000);
}
bootstrap();
