import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { JwtConstants } from "./auth.constants";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JwtConstants.secret
        })
    }

    async validate (payload: JwtPayload): Promise <User> {
        const { username } = payload;

        const user: User = await this.userRepository.findOne({ username });
        if(!user){
            throw new UnprocessableEntityException("Invalid user name or password. Please try again.");
        }

        return user;
    }
}