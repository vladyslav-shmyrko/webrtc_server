import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Server, ServerOptions } from 'socket.io';

export class WebsocketAdapter extends IoAdapter {
  constructor(
    appOrHttpServer: INestApplicationContext,
    private readonly corsOptions: CorsOptions,
  ) {
    super(appOrHttpServer);
  }

  create(port: number, options?: ServerOptions): Server {
    return super.create(port, {
      ...options,
      cors: this.corsOptions,
    });
  }
}
