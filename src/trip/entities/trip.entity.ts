import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ETripStatus } from '../enum/trip-status.enum';

@Entity('trip')
export class Trip {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  driverId: number;

  @Column()
  userId: number;

  @Column()
  pickupLocation: string;

  @Column()
  destinationLocation: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'enum', enum: ETripStatus })
  status: ETripStatus;
}
