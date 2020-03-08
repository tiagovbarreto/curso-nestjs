import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TasksFilterDTO } from './dto/task-filter-dto';
import { TaskStatus } from './task.status.enum';

const mockUser = { id: 1, username: 'test', password: 'password' };

const mockTaskRepository = () => ({
    getTasks: jest.fn().mockResolvedValue('someValue'),
})

describe('TasksService', () => {

    let tasksService: TasksService;
    let taskRepository: TaskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository},
            ]
        }).compile();

        tasksService =  module.get<TasksService>(TasksService);
        taskRepository = module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {

            const filters: TasksFilterDTO = { status: TaskStatus.OPEN, search: 'Something' };

            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toBe('someValue');

            
        })
    });

})