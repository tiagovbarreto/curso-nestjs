import { CreateTaskDTO } from "src/tasks/dto/create-task-dto";
import { TasksFilterDTO } from "src/tasks/dto/task-filter-dto";
import { Task, TaskStatus } from "src/tasks/tasks.model";
export declare class TasksService {
    private tasks;
    getAllTasks(): Task[];
    getTasksWithFilters(taskFilterDTO: TasksFilterDTO): Task[];
    getTaskById(id: string): Task;
    createTask(createTaskDTO: CreateTaskDTO): Task;
    updateTaskStatus(id: string, status: TaskStatus): Task;
    getDeleteTask(id: string): void;
}
