import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppConfig, Config } from './configs/config.type';
import { AppModule } from './modules/app.module';
import { GlobalExceptionFilter } from './common/http/global-exeption-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Config>);
  const appConfig = configService.get<AppConfig>('app');

  const config = new DocumentBuilder()
    .setTitle('Jan-2024')
    .setDescription('The API description')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelRendering: 7,
      persistAuthorization: true,
    },
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // await app.listen(appConfig.port, () => {
  //   const url = `http://${appConfig.host}:${appConfig.port}`;
  //   Logger.log(`Server running on ${url}`);
  //   Logger.log(`Swagger running on ${url}/docs`);
  // });

  await app.listen(appConfig.port, () => {
    Logger.log(`Server running on http://${appConfig.host}:${appConfig.port}`);
    Logger.log(
      `Swagger running on http://${appConfig.host}:${appConfig.port}/docs`,
    );
  });
}
void bootstrap();
