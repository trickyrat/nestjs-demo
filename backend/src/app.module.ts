import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { VerifySignUpMiddleware } from './middleware/verifySignUp.middleware';


@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        await getConnectionOptions()
    }),
    BooksModule,
    AuthorsModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      //.apply(JwtMiddleware)
      // .exclude(
      //   { path: "/auth/login", method: RequestMethod.POST },
      //   { path: "/auth/signup", method: RequestMethod.POST })
      // .forRoutes({ path: "/[a-zA-Z0-9]/_", method: RequestMethod.ALL })
      .apply(VerifySignUpMiddleware)
      .forRoutes({ path: "/auth/signup", method: RequestMethod.ALL })
  }

  constructor(private connection: Connection) { }

}