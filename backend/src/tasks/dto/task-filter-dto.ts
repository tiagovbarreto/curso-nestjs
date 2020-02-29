import { TaskStatus } from "../tasks.model";

export class TasksFilterDTO {
  public search: string;
  public status: TaskStatus;
}
