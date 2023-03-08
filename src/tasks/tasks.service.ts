import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilterTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    if (status) {
      return this.tasks.filter((tasksUpdate) => tasksUpdate.status === status);
    }

    if (search) {
      return this.tasks.filter(
        (tasksUpdate) =>
          tasksUpdate.title.includes(search) ||
          tasksUpdate.description.includes(search),
      );
    }
  }

  createTask(
    //title: string,
    //description: string
    createTaskDto: createTaskDto,
  ) {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      //..
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
    return found;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id != found.id);
  }

  updateTask(
    id: string,
    status: TaskStatus,
    title?: string,
    description?: string,
  ): Task[] {
    const tasksCopy = [...this.tasks];
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    tasksCopy[taskIndex] = {
      ...tasksCopy[taskIndex],
      status,
      title: tasksCopy[taskIndex].title || title,
      description: tasksCopy[taskIndex].description || description,
    };

    this.tasks = tasksCopy;

    return this.tasks;
  }
}
