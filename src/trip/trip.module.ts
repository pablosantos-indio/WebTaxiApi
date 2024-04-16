import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from './entities/trip.entity';
import { User } from '../user/entities/user.entity';
import { Driver } from '../driver/entities/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Trip,
      User,
      Driver,
    ]),
  ],
  controllers: [TripController],
  providers: [
    TripService
  ],
  exports: [TripService],

})
export class TripModule {}
