import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches, IsNotEmptyObject } from 'class-validator';

export class AuthCredentialsDTO {
  @IsNotEmptyObject()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: "password to weak."})
  password: string;
}
