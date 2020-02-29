import { CreateTaskDTO } from "src/tasks/dto/create-task-dto";
import { TasksFilterDTO } from "src/tasks/dto/task-filter-dto";
import { Task, TaskStatus } from "src/tasks/tasks.model";
import { TasksService } from "./tasks.service";
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(tasksFilterDTO: TasksFilterDTO): Task[];
    getTaskById(id: string): Task;
    createTask(createTaskDTO: CreateTaskDTO): Task;
    updateTaskStatus(id: string, status: TaskStatus): Task;
    deleteTask(id: string): void;
}
