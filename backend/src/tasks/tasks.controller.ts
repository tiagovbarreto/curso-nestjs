import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, createParamDecorator} from "@nestjs/common";
import { CreateTaskDTO } from "../tasks/dto/create-task-dto";
import { TasksFilterDTO } from "../tasks/dto/task-filter-dto";
import { TaskStatus } from "../tasks/task.status.enum";
import { TaskStatusValidationPipe } from "./pipes/tasks.status.validation.pipes";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService:TasksService) {}

  @Get()
  public getTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) filterDTO: TasksFilterDTO): Promise <Task[]> {
    return this.tasksService.getTasks(filterDTO, user);
  }

  @Get("/:id")
  public getTaskById(
    @GetUser() user: User,
    @Param("id", ParseIntPipe) id: number): Promise <Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createTask(
    @GetUser() user: User,
    @Body() createTaskDTO: CreateTaskDTO): Promise <Task> {
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Patch("/:id/status")
  public updateTaskStatus(
    @GetUser() user: User,
    @Param("id", ValidationPipe) id: number, 
    @Body("status", TaskStatusValidationPipe) status: TaskStatus): Promise <Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Delete("/:id")
  public deleteTask(
    @GetUser() user: User,
    @Param("id", ParseIntPipe) id: number): Promise <void> {
    return this.tasksService.deleteTask(id, user);
  }
}
