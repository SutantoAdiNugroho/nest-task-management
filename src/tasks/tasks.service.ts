import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private arrTask: Task[] = [];

  getAllTasks(): Task[] {
    return this.arrTask;
  }
}
