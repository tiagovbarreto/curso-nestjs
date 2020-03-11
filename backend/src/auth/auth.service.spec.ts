import {Test} from "@nestjs/testing";
import {User} from "../auth/user.entity";
import {AuthService} from "../auth/auth.service";
import {UserRepository} from "../auth/user.repository";
import {JwtStrategy} from "../auth/jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as config from 'config';

const mockAuthCredentialDTO = { username: 'name', password:'123456' };
const mockUser = new User() as jest.Mocked<User>;

const mockUserRepository = () => ({
  findOne: {},
  hashPassword: {},
  signUp: {},
});

describe('AuthService', () => {

  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach( async () => {

    const module = await Test.createTestingModule({
        imports: [
          PassportModule.register({ defaultStrategy:'jwt' }),
          JwtModule.register({
            secret: process.env.JWT_SECRET || config.get('jwt.secret'),
            signOptions: {
              expiresIn: config.get('jwt.expiresIn'),
            },
          }),
        ],
        providers: [
            AuthService,
            JwtStrategy,
            { provide: UserRepository, useFactory: mockUserRepository }
        ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);

  });

  describe('signUp', () => {
      it('Should successfully signUp', async() => {

        userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
        userRepository.signUp = jest.fn().mockResolvedValue(() => Promise.resolve());
        await authService.signUp(mockAuthCredentialDTO);
        expect(userRepository.findOne).toHaveBeenCalled();
        expect(userRepository.signUp).toHaveBeenCalled();


      });
  });

});

