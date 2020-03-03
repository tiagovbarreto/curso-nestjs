import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDTO } from "src/tasks/dto/create-task-dto";
import { TasksFilterDTO } from "src/tasks/dto/task-filter-dto";
import { TaskStatus } from "src/tasks/task-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskRespository } from "./task.respository";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRespository)
    private taskRepository: TaskRespository
  ){}

  public async getTasks(filterDTO: TasksFilterDTO): Promise <Task[]> {
    return await this.taskRepository.getTasks(filterDTO);
  }

  // public getTasksWithFilters(taskFilterDTO: TasksFilterDTO): Task[] {
  //   const { search, status } = taskFilterDTO;

  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) =>
  //       task.title.includes(search) ||
  //       task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }
  public async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
    
    return found;
  }
  
  public async createTask(createTaskDTO: CreateTaskDTO): Promise <Task> {
    createTaskDTO.status = TaskStatus.OPEN;
    return await this.taskRepository.createTask(createTaskDTO);
  }
  
  public async updateTaskStatus(id: number, status: TaskStatus): Promise <Task> {
 
    let task = await this.getTaskById(id);
    if(!task){
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
    
    task.status = status;
    const result = await this.taskRepository.update( id, task);
    
    return task;
  }

  public async getDeleteTask(id: number): Promise <void>{
    const result = await this.taskRepository.delete(id);

    if(result.affected === 0){
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
  }
}
