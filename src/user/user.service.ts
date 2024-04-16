import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRequestDto } from './dto/user-request.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: UserRequestDto) {
    await this.userRepository.save({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      password: await bcrypt.hash(dto.password, 10)
    });

    return "Data created!";
  }

  async findAll() {
    return await this.userRepository.find({
      select: ['id','firstName', 'lastName', 'email', 'phone', 'deletedAt']}
    );
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id','firstName', 'lastName', 'email', 'phone', 'deletedAt']
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async update(id: number, dto: UserRequestDto): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.userRepository.update(id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      password: await bcrypt.hash(dto.password, 10)
    });

    return "Data updated!";
  }

  async sofDelete(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.userRepository.update(id, {
      deletedAt: new Date()
    });

    return "Data deleted!";
  }
}
