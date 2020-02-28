import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from "src/tasks/dto/create-task-dto";
import { TasksFilterDTO } from "src/tasks/dto/task-filter-dto";
import { Task, TaskStatus } from "src/tasks/tasks.model";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService:TasksService) {}

  @Get()
  public getTasks(@Query() tasksFilterDTO: TasksFilterDTO): Task[] {
    return this.tasksService.getTasksWithFilters(tasksFilterDTO);
  }

  @Get("/:id")
  public getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch("/:id/status")
  public updateTaskStatus(@Param("id") id: string, @Body("status") status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete("/:id")
  public deleteTask(@Param("id") id: string): void {
    return this.tasksService.getDeleteTask(id);
  }
}

