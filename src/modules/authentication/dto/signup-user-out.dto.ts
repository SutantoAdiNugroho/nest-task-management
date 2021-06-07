import { User } from '../user.entity';

export class SignUpOutput {
  status: number;
  message: string;
  data: User;
}
