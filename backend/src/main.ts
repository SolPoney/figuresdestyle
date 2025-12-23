import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS pour autoriser le frontend Angular
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
  });

  // Validation automatique des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Retire les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // Rejette les requêtes avec propriétés non autorisées
      transform: true, // Transforme automatiquement les types
    }),
  );

  // Préfixe global pour toutes les routes API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend NestJS démarré sur http://localhost:${port}/api`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
}

bootstrap();
