import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Driver } from './entities/driver.entity';
import { DriverRepository } from './repository/driver.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Driver,
    ]),
  ],
  controllers: [],
  providers: [
      DriverRepository,
  ],
  exports: [],

})
export class DriverModule {}
