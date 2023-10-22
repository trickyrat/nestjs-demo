// import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => ({
  database: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    logging: process.env.MYSQL_LOGGING,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    synchronize: process.env.MYSQL_SYNCHRONIZE,
    poolSize: parseInt(process.env.MYSQL_POOLSIZE) || 5,
  },
});
