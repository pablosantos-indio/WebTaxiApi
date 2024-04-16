import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TripService } from './trip.service';
import { UserRequestTripDto } from './dto/user-request-trip.dto';
import { Trip } from './entities/trip.entity';
import { DriverAcceptTripDto } from './dto/driver-accept-trip.dto';

@Controller('trip/')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post('user-request')
  @HttpCode(HttpStatus.CREATED)
  async userRequestTrip(@Body() dto: UserRequestTripDto): Promise<string> {
    return await this.tripService.userRequestTrip(dto);
  }

  @Put(':id/cancel')
  async userCancelTrip(@Param('id') id: string): Promise<string> {
    return await this.tripService.userCancelTrip(+id);
  }

  @Put(':id/driver-accept')
  async driverAcceptTrip(@Param('id') id: string, @Body() dto: DriverAcceptTripDto): Promise<string> {
    return await this.tripService.driverAcceptTrip(+id, dto);
  }

  @Put(':id/driver-start')
  async driverStartTrip(@Param('id') id: string): Promise<string> {
    return await this.tripService.driverStartTrip(+id);
  }

  @Put(':id/complete')
  async driverCompleteTrip(@Param('id') id: string): Promise<string> {
    return await this.tripService.driverCompleteTrip(+id);
  }

  @Get()
  async findAll(): Promise<Trip[]> {
    return this.tripService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }
}
