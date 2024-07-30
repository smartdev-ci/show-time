import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly is_admin: number;
}
