import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { BooksController } from './books/books.controller';
import { BookService } from './books/books.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController, BooksController],
  providers: [AppService, BookService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
