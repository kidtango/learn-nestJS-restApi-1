import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): Task {
    const taskToBeDeleted = this.tasks.find(task => task.id === id);
    if (taskToBeDeleted) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      return taskToBeDeleted;
    } else {
      console.log("can't find task");
    }
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const targetTask = this.tasks.find(task => task.id === id);

    if (targetTask) {
      targetTask.status = status;
      return targetTask;
    } else {
      throw new Error("Task doesn't exist");
    }
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }
}
