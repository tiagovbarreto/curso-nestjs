import { TaskRepository } from "./task.repository"
import { Test } from "@nestjs/testing";
import { CreateTaskDTO } from "./dto/create-task-dto";
import { Task } from "./task.entity";
import { User } from "../auth/user.entity";

describe('TaskRepository', () => {

    let taskRepository: TaskRepository;
    const mockCreateTaskDTO = new CreateTaskDTO() as jest.Mocked<CreateTaskDTO>;
    const mockTask = new Task() as jest.Mocked<Task>;
    const mockUser = new User() as jest.Mocked<User>;

    beforeEach(async() => {
        const module = await Test.createTestingModule({
            providers: [TaskRepository]
        }).compile();

        taskRepository = module.get<TaskRepository>(TaskRepository);
    })

    describe('createTask', () => {
        it('Should successfully create a task', async() => {

            taskRepository.create = jest.fn().mockReturnValue( mockTask );
            mockTask.save = jest.fn().mockResolvedValue(() => Promise.resolve());

            expect(taskRepository.create).not.toHaveBeenCalled();
            expect(mockTask.save).not.toHaveBeenCalled();
            const result = await taskRepository.createTask(mockCreateTaskDTO, mockUser);
            expect(taskRepository.create).toHaveBeenCalled();
            expect(mockTask.save).toHaveBeenCalled();
            expect(result).toEqual(mockTask);

        })


    })
})