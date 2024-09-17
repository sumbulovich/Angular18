import { map, Observable, catchError } from 'rxjs';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { DUMMY_TASKS } from '../constants/dummy-tasks';
import { Task } from '../models/task.model';
import { HttpService } from '@app/core/http/services/http.service';
import { environment } from '@env/environment';

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
}
