import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDTO } from 'src/auth/dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { email, password, username } = authCredentialsDTO;

    const user: User = new User();
    user.email = email;
    user.password = password;
    user.username = username;

    await user.save();
  }
}
