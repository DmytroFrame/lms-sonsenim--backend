import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async function () {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix('/api');

  app.enableCors({
    credentials: true,
    maxAge: 9999,
    origin: '*',
  });

  SwaggerModule.setup(
    '/api/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('LMS Sonsenim API')
        .setDescription(
          'An example of a version of the LMS Sonsenim backend written in Nodejs and Nestjs',
        )
        .setVersion('1.0.0')
        .build(),
    ),
  );

  await app.listen(process.env.HTTP_PORT || 3000);
})();
