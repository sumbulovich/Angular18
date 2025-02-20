import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '@sumbulnpm/storybook-taskbox-lib';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  public readonly tasks: WritableSignal<Task[]> = signal([]);
  public readonly error: WritableSignal<boolean> = signal(false);
  public readonly isLoading: WritableSignal<boolean> = signal(false);

  constructor() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.isLoading.set(true);
    timer(1000).subscribe({
      next: () => {
        this.tasks.set([
          { id: '1', title: 'Task 1', state: 'TASK_INBOX' },
          { id: '2', title: 'Task 2', state: 'TASK_INBOX' },
          { id: '3', title: 'Task 3', state: 'TASK_INBOX' },
          { id: '4', title: 'Task 4', state: 'TASK_INBOX' },
          { id: '5', title: 'Task 5', state: 'TASK_INBOX' },
          { id: '6', title: 'Task 6', state: 'TASK_INBOX' },
        ]);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  pinTask(id: any) {
    this.tasks.update((tasks: Task[]) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        task.state = task.state === 'TASK_INBOX' ? 'TASK_PINNED' : 'TASK_INBOX';
      }
      return [...tasks];
    });
  }

  archiveTask(id: any) {
    this.tasks.update((tasks: Task[]) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        task.state = 'TASK_ARCHIVED';
      }
      return [...tasks];
    });
  }
}
