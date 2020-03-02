import { TaskStatusValidationPipe } from './pipes/tasks.status.validation.pipes';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe, UsePipes} from '@nestjs/common';
import { CreateTaskDTO } from "src/tasks/dto/create-task-dto";
import { TasksFilterDTO } from "src/tasks/dto/task-filter-dto";
import { Task, TaskStatus } from "src/tasks/tasks.model";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService:TasksService) {}

  @Get()
  public getTasks(@Query(ValidationPipe) tasksFilterDTO: TasksFilterDTO): Task[] {
    if(Object.keys(tasksFilterDTO).length) {
      return this.tasksService.getTasksWithFilters(tasksFilterDTO);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get("/:id")
  public getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch("/:id/status")
  public updateTaskStatus(
    @Param("id") id: string, 
    @Body("status", TaskStatusValidationPipe) status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete("/:id")
  public deleteTask(@Param("id") id: string): void {
    return this.tasksService.getDeleteTask(id);
  }
}

