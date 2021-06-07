import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/input/create-task.dto';
import { SearchTaskDto } from './dto/input/search-task.dto';
import { UpdateTaskStatusDto } from './dto/input/update-task.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: SearchTaskDto): Promise<Task[]> {
    return this.taskService.getAllTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }
}
