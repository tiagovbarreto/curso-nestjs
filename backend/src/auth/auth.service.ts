import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from "bcryptjs";
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
  	@InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ){}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise <void> {

    const { username, password } = authCredentialsDTO;
    const user: User = await this.userRepository.findOne({ username });

    if(user){
      throw new UnprocessableEntityException("User account already exists.");
    }

    authCredentialsDTO.password = await this.hashPassword(password);

    return await this.userRepository.signUp(authCredentialsDTO);

  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise <{ accessToken: string }>{

    const { username, password } = authCredentialsDTO;

    const user: User = await this.userRepository.findOne({ username });
    if(!user){
      throw new UnprocessableEntityException("Invalid user name or password. Please try again.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
      throw new UnprocessableEntityException("Invalid user name or password. Please try again.");
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken }

  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
