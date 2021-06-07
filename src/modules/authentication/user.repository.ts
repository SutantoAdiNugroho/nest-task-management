import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/signup-user-in.dto';
import { SignUpOutput } from './dto/signup-user-out.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUpUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignUpOutput> {
    const { username, phone_number, password } = authCredentialsDto;
    const task = this.create({ username, phone_number, password });
    await this.save(task);

    const response = new SignUpOutput();
    response.status = 200;
    response.message = `User successfully signed up with id ${task.id}`;
    response.data = task;

    return response;
  }
}
