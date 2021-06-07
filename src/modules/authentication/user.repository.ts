import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/input/signup-user-in.dto';
import { SignUpOutput } from './dto/output/signup-user-out.dto';
import { getHashPassword } from './helpers/user-pass.encrypt';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUpUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignUpOutput> {
    const { username, phone_number, password } = authCredentialsDto;
    const hashed = await getHashPassword(password);

    const task = this.create({ username, phone_number, password: hashed });

    try {
      await this.save(task);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Username already registered, try sign up with another username',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }

    const response = new SignUpOutput();
    response.status = 201;
    response.message = `User successfully signed up with id ${task.id}`;

    return response;
  }
}
