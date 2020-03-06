import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, createParamDecorator} from "@nestjs/common";
import { CreateTaskDTO } from "src/tasks/dto/create-task-dto";
import { TasksFilterDTO } from "src/tasks/dto/task-filter-dto";
import { TaskStatus } from "src/tasks/task-status.enum";
import { TaskStatusValidationPipe } from "./pipes/tasks.status.validation.pipes";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService:TasksService) {}

  @Get()
  public getTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) filterDTO: TasksFilterDTO): Promise <Task[]> {
    filterDTO.user = user;
    return this.tasksService.getTasks(filterDTO);
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
    createTaskDTO.user = user;
    return this.tasksService.createTask(createTaskDTO);
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
    return this.tasksService.getDeleteTask(id, user);
  }
}
