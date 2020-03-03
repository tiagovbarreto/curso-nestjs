import { IsNotEmpty, IsOptional, IsIn } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class CreateTaskDTO {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public description: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  public status: TaskStatus;
}
