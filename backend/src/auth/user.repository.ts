import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDTO } from '../auth/dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { password, username } = authCredentialsDTO;

    const user: User = this.create();
    user.password = password;
    user.username = username;

    await user.save();
  }
}
