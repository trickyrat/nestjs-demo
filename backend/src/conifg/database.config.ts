export const MySQLOptions = {
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