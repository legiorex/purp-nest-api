import { IsString, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  // @MinLength(6)
  password: string;
}
