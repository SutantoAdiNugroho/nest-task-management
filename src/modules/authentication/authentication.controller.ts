import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthCredentialsDto } from './dto/signup-user-in.dto';
import { SignUpOutput } from './dto/signup-user-out.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('signup')
  createTask(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignUpOutput> {
    return this.authService.signUpUser(authCredentialsDto);
  }
}
