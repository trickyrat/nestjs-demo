import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from "@nestjs/cache-manager";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { MySQLOptions } from './conifg/database.config';


const mysqlOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Trickyrat_05",
  database: "nestjsdemo",
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
}


@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({

        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "Trickyrat_05",
        database: "nestjsdemo",
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
      }),
      name: '',
    }),
    //MongooseModule.forRoot('mongodb://localhost/nestjsdemo'),
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