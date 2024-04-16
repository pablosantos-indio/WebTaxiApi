import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(dto: AuthRequestDto) {
    const user = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    return 'It was not possible to log in. Please check the data and try again.';
  }
}
