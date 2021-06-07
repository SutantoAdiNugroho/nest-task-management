import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './helpers/tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(filterTaskDto: SearchTaskDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask)
      throw new NotFoundException(`Task with id "${id}" not found`);

    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }
}
