import { Injectable, WritableSignal, signal } from '@angular/core';
import { DUMMY_TASKS } from '../constants/dummy-tasks';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private deletedTasks: WritableSignal<Task[]> = signal<Task[]>([]);;
  private tasks: WritableSignal<Task[]> = signal<Task[]>([]);

  constructor() {
    this.tasks.set(DUMMY_TASKS);
  }

  getUserTask(userId: number): Task[] {
    return this.tasks().filter((f) => f.userId === userId);
  }

  deleteTask(task: Task): void {
    this.deletedTasks.update((tasks) => [...tasks, task]);;
    this.tasks.update((tasks) => tasks.filter((f) => f.id !== task.id));
  }

  addTask(task: Task): void {
    this.tasks.update((tasks) => [...tasks, task]);
  }

  editTask(task: Task): void {
    this.tasks.update((tasks) => tasks.map((m) => m.id === task.id ? task : m ));
  }
}
