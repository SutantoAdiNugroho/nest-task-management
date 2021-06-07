import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/input/create-task.dto';
import { SearchTaskDto } from './dto/input/search-task.dto';
import { TaskStatus } from './helpers/tasks-status.enum';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterTaskDto: SearchTaskDto): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = await this.createQueryBuilder('task').orderBy(
      'task.created_at',
      'DESC',
    );

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const foundTasks = query.getMany();

    return foundTasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);

    return task;
  }
}
