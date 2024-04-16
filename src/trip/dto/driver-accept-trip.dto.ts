import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ETripStatus } from '../enum/trip-status.enum';

export class DriverAcceptTripDto {
  @IsNotEmpty()
  @IsNumber()
  driverId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  pickupLocation: string;

  @IsNotEmpty()
  @IsString()
  destinationLocation: string;

  @IsNotEmpty()
  @IsEnum(ETripStatus)
  status: ETripStatus;
}




