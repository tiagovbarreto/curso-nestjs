import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task-dto";
import { TasksFilterDTO } from "./dto/task-filter-dto";

@EntityRepository(Task)
export class TaskRespository extends Repository <Task>{

    async createTask(createTaskDTO: CreateTaskDTO): Promise <Task>{
        const { description, status, title } = createTaskDTO;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = status;
        await task.save();
        return task;
    }

    async getTasks(filterDTO: TasksFilterDTO): Promise <Task[]>{
        const { search, status } = filterDTO;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`});
        }

        const tasks = await query.getMany();
        return tasks;
    }
}