/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsIn } from 'class-validator';
import { TaskStatus } from '../task.model';
export class createTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
