import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInCredentialsDto } from './dto/input/signin-user-in.dto';
import { AuthCredentialsDto } from './dto/input/signup-user-in.dto';
import { SignUpOutput } from './dto/output/signup-user-out.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('/signup')
  userSignup(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignUpOutput> {
    return this.authService.signUpUser(authCredentialsDto);
  }

  @Post('/signin')
  userLogin(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<SignUpOutput> {
    return this.authService.signInUser(signInCredentialsDto);
  }
}
