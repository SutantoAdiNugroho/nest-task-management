import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from './dto/input/signin-user-in.dto';
import { AuthCredentialsDto } from './dto/input/signup-user-in.dto';
import { SignUpOutput } from './dto/output/signup-user-out.dto';
import { getComparedPassword } from './helpers/user-pass.encrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signUpUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignUpOutput> {
    return this.userRepository.signUpUser(authCredentialsDto);
  }

  async signInUser(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<SignUpOutput> {
    const { username, password } = signInCredentialsDto;
    const userFound = await this.userRepository.findOne({ username });
    const comparedPassword = await getComparedPassword(
      password,
      userFound.password,
    );
    const response = new SignUpOutput();

    if (userFound && comparedPassword) {
      response.status = 201;
      response.message = `Successfully login with username "${username}"`;

      return response;
    } else {
      throw new UnauthorizedException(
        "There's something wrong when login, please check your login data",
      );
    }
  }
}
