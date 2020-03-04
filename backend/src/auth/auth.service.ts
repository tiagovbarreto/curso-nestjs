import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
  	@InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise <void> {

    const { username } = authCredentialsDTO;
    const user = await this.userRepository.findOne({ username });

    if(user){
      throw new BadRequestException("User account already exists.");
    }

    return await this.userRepository.singUp(authCredentialsDTO);
  }

}
