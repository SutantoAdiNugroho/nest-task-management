import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInCredentialsDto {
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  password: string;
}
