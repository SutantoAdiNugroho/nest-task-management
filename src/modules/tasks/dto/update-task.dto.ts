import { IsEnum } from 'class-validator';
import { TaskStatus } from '../helpers/tasks-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
