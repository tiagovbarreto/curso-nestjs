import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from 'src/tasks/dto/create-task-dto';
import { TasksFilterDTO } from 'src/tasks/dto/task-filter-dto';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { Task } from './task.entity';
import { TaskRespository } from './task.respository';
import { User } from 'src/auth/user.entity';
import { userInfo } from 'os';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRespository)
    private taskRepository: TaskRespository,
  ) {}

  public async getTasks(filterDTO: TasksFilterDTO): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDTO);
  }

  public async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: {id, userId: user.id }});

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    return found;
  }

  public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    createTaskDTO.status = TaskStatus.OPEN;
    return await this.taskRepository.createTask(createTaskDTO);
  }

  public async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task: Task = await this.getTaskById(id, user);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    task.status = status;
    await this.taskRepository.update(id, task);

    return task;
  }

  public async getDeleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id});

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
  }
}
