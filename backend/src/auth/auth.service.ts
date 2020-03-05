import { Injectable, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import * as bcrypt from "bcrypt";
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
  	@InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise <void> {

    const { username, password } = authCredentialsDTO;
    const user: User = await this.userRepository.findOne({ username });

    if(user){
      throw new UnprocessableEntityException("User account already exists.");
    }

    authCredentialsDTO.password = await this.hashPassword(password);

    return await this.userRepository.singUp(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO){

    const { username, password } = authCredentialsDTO;

    const user: User = await this.userRepository.findOne({ username });
    if(!user){
      throw new UnprocessableEntityException("Invalid user name or password. Please try again.");
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
      throw new UnprocessableEntityException("Invalid user name or password. Please try again.");
    }

  }


  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
