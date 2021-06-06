import { TaskStatus } from '../tasks.model';

export class SearchTaskDto {
  status?: TaskStatus;
  search?: string;
}
