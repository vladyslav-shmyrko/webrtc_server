import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WebsocketAdapter } from './chat/websocket-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: true,
  });

  app.useWebSocketAdapter(
    new WebsocketAdapter(app, {
      origin: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
