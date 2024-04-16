import {  Repository } from 'typeorm';
import {Injectable} from "@nestjs/common";
import { Trip } from '../entities/trip.entity';

@Injectable()
export class TripRepository extends Repository<Trip> {
}
