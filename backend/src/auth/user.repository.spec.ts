import { Test } from "@nestjs/testing";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

describe('UserRepository', () => {

    let userRepository: UserRepository;
    const mockAuthCredentialsDTO = new AuthCredentialsDTO() as jest.Mocked<AuthCredentialsDTO>
    const mockUser = new User() as jest.Mocked<User>

    beforeEach( async() => {
        const module = await Test.createTestingModule({
            providers: [UserRepository]
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository)
    })

    describe('signUp', () => {

        it('Should signUp', async() => {

            userRepository.create = jest.fn().mockReturnValue( mockUser );
            mockUser.save = jest.fn().mockResolvedValue(() => Promise.resolve());

            expect(mockUser.save).not.toHaveBeenCalled();
            expect(userRepository.create).not.toHaveBeenCalled();
            expect(userRepository.signUp(mockAuthCredentialsDTO)).resolves.not.toThrow();
            expect(mockUser.save).toHaveBeenCalled();
            expect(userRepository.create).toHaveBeenCalled();

        })


    })
})
