import { TaskRepository } from "./task.repository"
import { Test } from "@nestjs/testing";
import { CreateTaskDTO } from "./dto/create-task-dto";
import { Task } from "./task.entity";
import { User } from "../auth/user.entity";
import {TasksFilterDTO} from "../tasks/dto/task-filter-dto";
import {TaskStatus} from "src/tasks/task.status.enum";

describe('TaskRepository', () => {

    let taskRepository: TaskRepository;
    let query;
    const mockCreateTaskDTO = new CreateTaskDTO() as jest.Mocked<CreateTaskDTO>;
    const mockTasksFilterDTO = new TasksFilterDTO() as jest.Mocked<TasksFilterDTO>;
    const mockTask = new Task() as jest.Mocked<Task>;
    const mockUser = new User() as jest.Mocked<User>;

    beforeEach( async() => {
        const module = await Test.createTestingModule({
            providers: [TaskRepository]
        }).compile();

        taskRepository = module.get<TaskRepository>(TaskRepository);

        taskRepository.createQueryBuilder = jest.fn().mockReturnValue({
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockReturnThis()
        });

        query = taskRepository.createQueryBuilder();
    })

    afterEach( async () => {


    })

    describe('createTask', () => {
        it('Should successfully create a task', async () => {

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

    describe('getTasks', () => {

        it('Should return tasks only with userId', async() => {

            mockTasksFilterDTO.status = null;
            mockTasksFilterDTO.search = null;

            await taskRepository.getTasks(mockTasksFilterDTO, mockUser);

            expect(query.where).toHaveBeenCalled();
            expect(query.andWhere).not.toHaveBeenCalled();
            expect(query.getMany).toHaveBeenCalled();

        })

        it('Should return tasks with userId and status', async() => {

            mockTasksFilterDTO.status = TaskStatus.OPEN;
            mockTasksFilterDTO.search = null;

            await taskRepository.getTasks(mockTasksFilterDTO, mockUser);

            expect(query.where).toHaveBeenCalled();
            expect(query.andWhere).toHaveBeenCalledTimes(1);
            expect(query.getMany).toHaveBeenCalled();
        })

        it('Should return tasks with userId and search', async() => {

            mockTasksFilterDTO.status = null;
            mockTasksFilterDTO.search = 'qualquer texto';

            await taskRepository.getTasks(mockTasksFilterDTO, mockUser);

            expect(query.where).toHaveBeenCalled();
            expect(query.andWhere).toHaveBeenCalledTimes(1);
            expect(query.getMany).toHaveBeenCalled();
        })

        it('Should return tasks with userId, status and search', async() => {

            mockTasksFilterDTO.status = TaskStatus.IN_PROGRESS;
            mockTasksFilterDTO.search = 'qualquer texto';

            await taskRepository.getTasks(mockTasksFilterDTO, mockUser);

            expect(query.where).toHaveBeenCalled();
            expect(query.andWhere).toHaveBeenCalledTimes(2);
            expect(query.getMany).toHaveBeenCalled();
        })
    })
})
