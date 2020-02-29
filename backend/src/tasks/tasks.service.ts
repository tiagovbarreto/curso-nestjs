import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "src/tasks/dto/create-task-dto";
import { TasksFilterDTO } from "src/tasks/dto/task-filter-dto";
import { Task, TaskStatus } from "src/tasks/tasks.model";
import * as uuid from "uuid/v1";

@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(taskFilterDTO: TasksFilterDTO): Task[] {
    const { search, status } = taskFilterDTO;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter( (task) => task.status === status );
    }

    if (search) {
      tasks = tasks.filter( (task) =>
        task.title.includes(search) ||
        task.description.includes(search),
      );
    }

    return tasks;
  }

  public getTaskById(id: string){
    return this.tasks.find( (task) => task.id === id );
  }

  public createTask(createTaskDTO: CreateTaskDTO) {
    const { title, description } = createTaskDTO;

    const task: Task = {
      description,
      id: uuid(),
      status: TaskStatus.OPEN,
      title,
    };

    this.tasks.push(task);
    return task;
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  public getDeleteTask(id: string): void {
    this.tasks = this.tasks.filter( (task) => task.id !== id);
  }
}
