import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpService } from '@app/core/http/services/http.service';
import { environment } from '@env/environment';
import { Task } from '../models/task.model';

@Injectable()
export class TasksService {
  public readonly tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = `${environment.apiUrl}/api/tasks`;

  getUserTask(userId: string): void {
    this.httpService.get<Task[]>(`${this.url}/${userId}`).subscribe({
      next: (tasks) => this.tasks.set(tasks),
      error: () => { /* Error catch by errorInterceptor */ }
    });
  }

  deleteTask(task: Task): void {
    this.httpService.delete<Task>(`${this.url}/${task._id}`).subscribe({
      next: () => this.tasks.update((tasks) => tasks.filter((f) => f._id !== task._id)),
      error: () => { /* Error catch by errorInterceptor */ }
    });
  }

  addTask(task: Task): void {
    this.httpService.post<Task>(`${this.url}`, task).subscribe({
      next: () => this.tasks.update((tasks) => [...tasks, task]),
      error: () => { /* Error catch by errorInterceptor */ }
    });
  }

  editTask(task: Task): void {
    this.httpService.put<Task>(`${this.url}`, task).subscribe({
      next: () => this.tasks.update((tasks) => tasks.map((m) => m._id === task._id ? task : m)),
      error: () => { /* Error catch by errorInterceptor */ }
    });
  }

  editTaskStatus(task: Task): void {
    this.httpService.put<Task>(`${this.url}/status/${task._id}`, { status: task.status }).subscribe({
      next: () => this.tasks.update((tasks) => tasks.map((m) => m._id === task._id ? task : m)),
      error: () => { /* Error catch by errorInterceptor */ }
    });
  }
}
