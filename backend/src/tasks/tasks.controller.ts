import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe, ParseIntPipe} from "@nestjs/common";
import { CreateTaskDTO } from "src/tasks/dto/create-task-dto";
import { TasksFilterDTO } from "src/tasks/dto/task-filter-dto";
import { TaskStatus } from "src/tasks/task-status.enum";
import { TaskStatusValidationPipe } from "./pipes/tasks.status.validation.pipes";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService:TasksService) {}

  @Get()
  public getTasks(@Query(ValidationPipe) filterDTO: TasksFilterDTO): Promise <Task[]> {
    return this.tasksService.getTasks(filterDTO);
  }

  @Get("/:id")
  public getTaskById(@Param("id", ParseIntPipe) id: number): Promise <Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(@Body() createTaskDTO: CreateTaskDTO): Promise <Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch("/:id/status")
  public updateTaskStatus(
    @Param("id", ValidationPipe) id: number, 
    @Body("status", TaskStatusValidationPipe) status: TaskStatus): Promise <Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete("/:id")
  public deleteTask(@Param("id", ParseIntPipe) id: number): Promise <void> {
    return this.tasksService.getDeleteTask(id);
  }
}
