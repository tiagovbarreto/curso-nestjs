import { TaskStatus } from "../tasks.model";
import { IsOptional, IsNotEmpty, IsEnum, IsIn } from "class-validator";

export class TasksFilterDTO {
  @IsOptional()
  @IsNotEmpty()
  public search: string;
  
  @IsOptional()
  //@IsEnum(TaskStatus)
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  public status: TaskStatus;
}
