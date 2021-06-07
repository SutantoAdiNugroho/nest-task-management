import { TaskStatus } from '../../helpers/tasks-status.enum';

export class SearchTaskDto {
  status?: TaskStatus;
  search?: string;
}
