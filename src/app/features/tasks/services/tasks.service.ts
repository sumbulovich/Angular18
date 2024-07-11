import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../constants/dummy-tasks';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  completedTasks: Task[] = [];
  deletedTasks: Task[] = [];
  tasks: Task[] = [];
  $task: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.tasks = DUMMY_TASKS;
    this.$task.next(this.tasks);
  }

  getUserTask(userId: number): Observable<Task[]> {
    return this.$task.pipe(map((m) => m.filter((f) => f.userId === userId)));
  }

  completeTask(task: Task): void {
    this.completedTasks.unshift(task);
    this.tasks = this.tasks.filter((f) => f.id !== task.id);
    this.$task.next(this.tasks);
  }

  deleteTask(task: Task): void {
    this.deletedTasks.unshift(task);
    this.tasks = this.tasks.filter((f) => f.id !== task.id);
    this.$task.next(this.tasks);
  }

  addTask(task: Task): void {
    this.tasks.unshift(task);
    this.$task.next(this.tasks);
  }

  editTask(task: Task): void {
    const index = this.tasks.findIndex((f) => f.id === task.id);
    this.tasks[index] = task;
    this.$task.next(this.tasks);
  }
}
