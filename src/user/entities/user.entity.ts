import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

}
