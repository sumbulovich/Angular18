import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpService } from '@app/core/http/services/http.service';
import { environment } from '@env/environment';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public readonly tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = `${environment.apiUrl}/api/tasks`;

  constructor() {
  }

  getUserTask(userId: string): void {
    this.httpService.get<Task[]>(`${this.url}/${userId}`).subscribe((tasks) => {
      this.tasks.set(tasks)
    });
  }

  deleteTask(task: Task): void {
    this.httpService.delete<Task>(`${this.url}/${task._id}`).subscribe(() => {
      this.tasks.update((tasks) => tasks.filter((f) => f._id !== task._id));
    });
  }

  addTask(task: Task): void {
    this.httpService.post<Task>(`${this.url}`, task).subscribe((task) => {
      this.tasks.update((tasks) => [...tasks, task])
    });
  }

  editTask(task: Task): void {
    this.httpService.put<Task>(`${this.url}`, task).subscribe(() => {
      this.tasks.update((tasks) => tasks.map((m) => m._id === task._id ? task : m));
    });
  }

  editTaskStatus(task: Task): void {
    this.httpService.put<Task>(`${this.url}/status/${task._id}`, { status: task.status }).subscribe(() => {
      this.tasks.update((tasks) => tasks.map((m) => m._id === task._id ? task : m));
    });
  }
}
