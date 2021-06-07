import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/signup-user-in.dto';
import { SignUpOutput } from './dto/signup-user-out.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  signUpUser(authCredentialsDto: AuthCredentialsDto): Promise<SignUpOutput> {
    return this.userRepository.signUpUser(authCredentialsDto);
  }
}
