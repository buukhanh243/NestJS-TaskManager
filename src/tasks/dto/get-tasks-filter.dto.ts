/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  // eslint-disable-next-line prettier/prettier
  @IsNotEmpty()
  status: TaskStatus;

  @IsNotEmpty()
  search: string;
}
