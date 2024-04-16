import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
          host: process.env.DB_HOST,
          type: 'mysql',
          port: +process.env.DB_PORT ?? 3306,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          synchronize: false,
          logging: 'all',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          // entities: [
          //     `./src/**/*.entity{.ts,.js}`,
          // ],
      }),
    }),
      UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
