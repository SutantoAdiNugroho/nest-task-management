import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as taskId } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TasksService {
  private arrTask: Task[] = [];

  getAllTasks(): Task[] {
    return this.arrTask;
  }

  searchTask(filterTaskDto: SearchTaskDto): Task[] {
    const { status, search } = filterTaskDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.arrTask.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const idNo = taskId().substring(0, 8).toUpperCase();

    const task: Task = {
      id: idNo,
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.arrTask.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
