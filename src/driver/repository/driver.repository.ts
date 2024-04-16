import {  Repository } from 'typeorm';
import {Injectable} from "@nestjs/common";
import { Driver } from '../entities/driver.entity';

@Injectable()
export class DriverRepository extends Repository<Driver> {
}
