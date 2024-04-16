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
    private usuarioRepository: Repository<User>,
  ) {}

  async create(dto: UserRequestDto) {
    await this.usuarioRepository.save({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      password: await bcrypt.hash(dto.password, 10)
    });
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOne(id: string) {
    return await this.usuarioRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, dto: UserRequestDto) {
    return await this.usuarioRepository.update(id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      password: await bcrypt.hash(dto.password, 10)
    });
  }

  async delete(id: string) {
    return await this.usuarioRepository.delete(id);
  }
}
