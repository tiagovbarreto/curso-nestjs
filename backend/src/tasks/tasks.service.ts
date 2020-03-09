import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from '../tasks/dto/create-task-dto';
import { TasksFilterDTO } from '../tasks/dto/task-filter-dto';
import { TaskStatus } from '../tasks/task.status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  public async getTasks(filterDTO: TasksFilterDTO, user): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDTO, user);
  }

  public async getTaskById(id: number, user): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: {id, userId: user.id }});

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    return found;
  }

  public async createTask(createTaskDTO: CreateTaskDTO, user): Promise<Task> {
    createTaskDTO.status = TaskStatus.OPEN;
    return await this.taskRepository.createTask(createTaskDTO, user);
  }

  public async updateTaskStatus(id: number, status: TaskStatus, user): Promise<Task> {
    const task: Task = await this.getTaskById(id, user);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    task.status = status;
    await this.taskRepository.update(id, task);

    return task;
  }

  public async deleteTask(id: number, user): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id});

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
  }
}
