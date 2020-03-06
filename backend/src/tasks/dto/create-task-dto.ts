import { IsNotEmpty, IsOptional, IsIn } from "class-validator";
import { TaskStatus } from "../task-status.enum";
import { User } from "src/auth/user.entity";

export class CreateTaskDTO {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public description: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  public status: TaskStatus;

  @IsOptional()
  public user: User;
}
