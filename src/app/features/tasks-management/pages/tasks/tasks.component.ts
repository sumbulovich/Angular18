import { Component, computed, effect, inject, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthStore } from '@app/core/auth/state/auth.store';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { take } from 'rxjs';
import { User } from '../../models/user.model';
import { Task, TaskStatus } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TaskComponent } from '../../components/task/task.component';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { InfoComponent } from "../../../../shared/components/info/info.component";
import { SortComponent } from "../../../../shared/components/sort/sort.component";

@Component({
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatTooltipModule, MatFormFieldModule, MatSelectModule, EllipsisTooltipDirective, TaskComponent, FormsModule, RouterOutlet, MatIconModule, RouterLink, InfoComponent, SortComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  readonly authStore = inject(AuthStore);
  readonly router = inject(Router);
  private tasksService: TasksService = inject(TasksService);
  private dialog: MatDialog = inject(MatDialog);
  filter: WritableSignal<TaskStatus | 'all'> = signal<TaskStatus | 'all'>('all');

  // These inputs are gotten from ActivatedRoute (params, queryParams, data, resolves) (withComponentInputBinding)
  // This approach doesn't need access to activatedRoute
  userId: InputSignal<string> = input.required<string>(); // Params
  order: InputSignal<'asc' | 'desc'> = input<'asc' | 'desc'>('desc'); // QueryParams
  user: InputSignal<User | undefined> = input<User>(); // Resolvers

  tasks: Signal<Task[]> = computed(() => {
    let tasks = this.tasksService.tasks();
    if (this.filter() !== 'all') tasks = tasks.filter((f) => f.status === this.filter())
    return tasks.sort((a, b) => {
      const comparison = new Date(a.dueDate).getTime() > new Date(b.dueDate).getTime();
      if (this.order() === 'asc') return comparison ? -1 : 1
      else return comparison ? 1 : -1
    });
  });

  constructor() {
    effect(() => {
      if (this.user()) this.tasksService.getUserTask(this.userId());
      // Navigates while replacing the current state in history to prevent navigate to previous page with back button
      else this.router.navigate(['tasks', this.userId(), 'not-found'], { replaceUrl: true });
    });
  }

  editTaskStatus(task: Task): void {
    this.tasksService.editTaskStatus(task);
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task);
  }

  openAddTaskDialog(editTask?: Task): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        component: TaskDialogComponent,
        componentInputs: {
          'task': editTask || { userId: this.userId() },
        },
        title: `${editTask ? 'Edit' : 'New'} Task`,
        content: `${this.user()?.name}'s task:`,
        btnText: `${editTask ? 'Save' : 'Add'}`
      },
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe((task?: Task) => {
      if (!task) return;
      if (editTask) this.tasksService.editTask(task);
      else this.tasksService.addTask(task);
    });
  }
}
