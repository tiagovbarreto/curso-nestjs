import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthCredentialsDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
