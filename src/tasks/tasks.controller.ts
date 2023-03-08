import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { title } from 'process';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  // @UsePipes(ValidationPipe)
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getFilterTasks(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskDto: createTaskDto,
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTask(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.tasksService.updateTask(id, status, title, description);
  }
}
