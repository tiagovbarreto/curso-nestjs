import { IsIn, IsNotEmpty,IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";
import { User } from "src/auth/user.entity";

export class TasksFilterDTO {
  @IsOptional()
  @IsNotEmpty()
  public search: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  public status: TaskStatus;

  @IsOptional()
  public user: User;
}
