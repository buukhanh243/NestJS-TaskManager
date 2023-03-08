/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  // eslint-disable-next-line prettier/prettier
  @IsNotEmpty()
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search: string;
}
