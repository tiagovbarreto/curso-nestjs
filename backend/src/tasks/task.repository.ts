import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task-dto";
import { TasksFilterDTO } from "./dto/task-filter-dto";
import { User } from "../auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository <Task>{

    async createTask(createTaskDTO: CreateTaskDTO): Promise <Task>{
        const { description, status, title } = createTaskDTO;
        const task = new Task();
        task.user = createTaskDTO.user;
        task.title = title;
        task.description = description;
        task.status = status;
        await task.save();

        delete task.user;
        
        return task;
    }

    async getTasks(filterDTO: TasksFilterDTO, user: User): Promise <Task[]>{
        const { search, status } = filterDTO;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id});

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