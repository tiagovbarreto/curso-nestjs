import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TasksFilterDTO } from './dto/task-filter-dto';
import { TaskStatus } from './task.status.enum';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task-dto';
import {Task} from '../tasks/task.entity';
import {User} from '../auth/user.entity';

const mockCreateTaskDTO: CreateTaskDTO = { description: 'desc', status: TaskStatus.OPEN, title: 'Something' };
const mockTask = new Task() as jest.Mocked<Task>;
const mockTaskFilterDTO: TasksFilterDTO = { status: TaskStatus.OPEN, search: 'Something' };
const mockUser = new User() as jest.Mocked<User>

const mockTaskRepository = () => ({
    getTasks: {},
    findOne: {},
    createTask: {},
    delete:{},
    update:{}
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

            taskRepository.getTasks = jest.fn().mockResolvedValue('someValue');
            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const result = await tasksService.getTasks(mockTaskFilterDTO, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toBe('someValue');

        })
    });

    describe('getTasksById', () => {
        it('Should succesfully retrieve task by id', async() => {

            taskRepository.findOne = jest.fn().mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask);
            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: { id: 1, userId: mockUser.id }
            })
        });

        it('Should throw an error if no task is found.', () => {

            taskRepository.findOne = jest.fn().mockResolvedValue(null);
            const result = tasksService.getTaskById(1, mockUser);
            expect(result).rejects.toThrow(NotFoundException)

        })
    })

    describe('createTask', () => {
        it('Should successfully create a task', async() => {

            taskRepository.createTask = jest.fn().mockResolvedValue(mockTask);
            expect(taskRepository.createTask).not.toHaveBeenCalled();
            const result = await tasksService.createTask(mockCreateTaskDTO, mockUser);
            expect(taskRepository.createTask).toHaveBeenCalledWith(mockCreateTaskDTO, mockUser);
            expect(result).toEqual(mockTask);
        })
    })

    describe('deleteTask', () => {
        it('Should successfully delete a task', async () => {

            taskRepository.delete = jest.fn().mockResolvedValue({ affected: 1 });
            expect(taskRepository.delete).not.toHaveBeenCalled();
            await tasksService.deleteTask(1, mockUser);
            expect(taskRepository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id })

        })

        it('Should throw an error if no task is found.', () => {

            taskRepository.delete = jest.fn().mockResolvedValue({ affected: 0 });
            const result = tasksService.deleteTask(1, mockUser);
            expect(result).rejects.toThrow(NotFoundException)

        })
    })

    describe('updateTaskStatus', () => {
        it('Should successfully update task status', async() => {

            taskRepository.update = jest.fn().mockResolvedValue(() => Promise.resolve());
            jest.spyOn(tasksService, 'getTaskById').mockResolvedValue(mockTask);

            expect(taskRepository.update).not.toHaveBeenCalled();
            const result = await tasksService.updateTaskStatus(1, TaskStatus.IN_PROGRESS, mockUser)
            expect(taskRepository.update).toHaveBeenCalled();
            expect(result.status).toBe(TaskStatus.IN_PROGRESS);

        })

        it('Should throw an error if no task is found.', () => {

            taskRepository.update = jest.fn().mockResolvedValue(() => Promise.resolve());
            jest.spyOn(tasksService, 'getTaskById').mockResolvedValue(null);

            const result =  tasksService.updateTaskStatus(1, TaskStatus.DONE, mockUser);
            expect(result).rejects.toThrow(NotFoundException)
            expect(taskRepository.update).not.toHaveBeenCalled();

        })
    })


})
