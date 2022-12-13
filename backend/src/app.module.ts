import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';



@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRootAsync({
      name: '',
      useFactory: async () => ({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "trickyrat",
        database: "test",
        logging: false,
        autoLoadEntities: true,
        entities: [
          "dist/**/*.entity{.ts,.js}"
        ],
        migrations: [
          "src/migration/**/*.ts"
        ],
        subscribers: [
          "src/subscriber/**/*.ts"
        ],
        synchronize: true,
        pool: {
          "max": 5,
          "min": 0,
          "acquire": 30000,
          "idle": 1000
        }
      })
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
  }

  constructor(private dataSource: DataSource) { }

}