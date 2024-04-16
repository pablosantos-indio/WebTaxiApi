import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('driver')
export class Driver {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  vehicleMake: string;

  @Column()
  vehicleModel: string;

  @Column()
  vehicleColour: string;

  @Column({ unique: true })
  vehiclePlate: string;

  @Column({ unique: true })
  taxiNumber: string;
}
