import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpService } from '@app/core/http/services/http.service';
import { environment } from '@env/environment';
import { Task } from '../models/task.model';

@Injectable()
export class TasksService {
  public readonly tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  public readonly isLoading: WritableSignal<boolean> = signal<boolean>(false);
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = `${environment.apiUrl}/api/tasks`;

  getUserTask(userId: string): void {
    this.isLoading.set(true);
    this.httpService.get<Task[]>(`${this.url}/${userId}`).subscribe({
      next: (tasks) => this.tasks.set(tasks),
      complete: () => this.isLoading.set(false),
      /* Error catch by errorInterceptor */
    });
  }

  /* Optimistic update */
  deleteTask(task: Task): void {
    const prevTasks = this.tasks(); // Store previous state
    this.tasks.update((tasks) => tasks.filter((f) => f._id !== task._id));
    this.httpService.delete<Task>(`${this.url}/${task._id}`).subscribe({
      error: () => this.tasks.set(prevTasks), // Revert if request fails
      /* Error catch by errorInterceptor */
    });
  }

  /* Optimistic update */
  addTask(task: Task): void {
    const prevTasks = this.tasks();
    const tempTask: Task = { ...task, _id: 'temp-' + Date.now() }; // Temporary ID
    this.tasks.update((tasks) => [...tasks, tempTask]);
    this.httpService.post<Task>(`${this.url}`, task).subscribe({
      next: (newTask: Task) =>
        this.tasks.update((tasks) =>
          tasks.map((t) => (t._id === tempTask._id ? newTask : t)),
        ),
      error: () => this.tasks.set(prevTasks), // Revert if request fails
      /* Error catch by errorInterceptor */
    });
  }

  /* Optimistic update */
  editTask(task: Task): void {
    const prevTasks = this.tasks();
    this.tasks.update((tasks) =>
      tasks.map((t) => (t._id === task._id ? task : t)),
    );
    this.httpService.put<Task>(`${this.url}`, task).subscribe({
      error: () => this.tasks.set(prevTasks), // Revert if request fails
      /* Error catch by errorInterceptor */
    });
  }

  /* Optimistic update */
  editTaskStatus(task: Task): void {
    const prevTasks = this.tasks();
    this.tasks.update((tasks) =>
      tasks.map((t) => (t._id === task._id ? task : t)),
    );
    this.httpService
      .put<Task>(`${this.url}/status/${task._id}`, { status: task.status })
      .subscribe({
        error: () => this.tasks.set(prevTasks), // Revert if request fails
        /* Error catch by errorInterceptor */
      });
  }
}
