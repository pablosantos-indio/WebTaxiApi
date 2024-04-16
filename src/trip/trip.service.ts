import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRequestTripDto } from './dto/user-request-trip.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Trip } from './entities/trip.entity';
import { User } from '../user/entities/user.entity';
import { Driver } from '../driver/entities/driver.entity';
import { DriverAcceptTripDto } from './dto/driver-accept-trip.dto';
import { ETripStatus } from './enum/trip-status.enum';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async userRequestTrip(dto: UserRequestTripDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId }
    });

    if(!user){
      throw new NotFoundException('User not found!');
    }

    const trip = await this.tripRepository.save({
      userId: dto.userId,
      pickupLocation: dto.pickupLocation,
      destinationLocation: dto.destinationLocation,
      status: ETripStatus.WAITING
    });

    return `${user.firstName} request trip id: ${trip.id}!`;
  }

  async userCancelTrip(id: number) {
    const trip = await this.tripRepository.findOne({
      where: { id }
    });

    if(!trip){
      throw new NotFoundException('Trip not found!');
    }

    const allowedStatus = [ETripStatus.DRIVING, ETripStatus.WAITING];

    if (!allowedStatus.includes(trip.status)) {
      throw new BadRequestException('Status trip not allowed!');
    }

    await this.tripRepository.update(id, {
      status: ETripStatus.CANCELED
    });

    return `Trip id: ${trip.id} canceled!`;
  }

  async driverAcceptTrip(id: number, dto: DriverAcceptTripDto) {
    const driver = await this.driverRepository.findOne({
      where: { id: dto.driverId }
    });

    if(!driver){
      throw new NotFoundException('Driver not found!');
    }

    const trip = await this.tripRepository.findOne({
      where: { id }
    });

    if(!trip){
      throw new NotFoundException('Trip not found!');
    }

    if(trip.status != ETripStatus.WAITING){
      throw new BadRequestException('Status trip not allowed!');
    }

    await this.tripRepository.update(id, {
      driverId: dto.driverId,
      status: ETripStatus.ON_WAY
    });

    return `${driver.firstName} accepted!`;
  }

  async driverStartTrip(id: number) {
    const trip = await this.tripRepository.findOne({
      where: { id }
    });

    if(!trip){
      throw new NotFoundException('Trip not found!');
    }

    if(trip.status != ETripStatus.ON_WAY){
      throw new BadRequestException('Status trip not allowed!');
    }

    await this.tripRepository.update(id, {
      status: ETripStatus.DRIVING
    });

    return `Trip id: ${trip.id} driving!`;
  }

  async driverCompleteTrip(id: number) {
    const trip = await this.tripRepository.findOne({
      where: { id }
    });

    if(!trip){
      throw new NotFoundException('Trip not found!');
    }

    if(trip.status != ETripStatus.DRIVING){
      throw new BadRequestException('Status trip not allowed!');
    }

    await this.tripRepository.update(id, {
      status: ETripStatus.COMPLETED
    });

    return `Trip id: ${trip.id} completed!`;
  }

  async findAll(): Promise<Trip[]>  {
    return await this.tripRepository.find();
  }

  async findOne(id: number) {
    return await this.tripRepository.findOne({
      where: { id },
    });
  }

}
