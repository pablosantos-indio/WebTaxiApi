import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDto {

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
