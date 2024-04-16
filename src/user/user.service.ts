import { Injectable } from '@nestjs/common';
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
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, dto: UserRequestDto): Promise<string> {
    await this.userRepository.update(id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      password: await bcrypt.hash(dto.password, 10)
    });

    return "Data updated!";
  }

  async delete(id: string): Promise<string> {
    await this.userRepository.delete(id);

    return "Data deleted!";
  }
}
