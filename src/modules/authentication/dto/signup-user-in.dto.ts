import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  username: string;

  @IsPhoneNumber('ID')
  phone_number: string;

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  password: string;
}

// Passwords will contain at least 1 upper case letter
// Passwords will contain at least 1 lower case letter
// Passwords will contain at least 1 number or special character
// There is no length validation (min, max) in this regex!
// ((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
