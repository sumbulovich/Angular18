import { AsyncPipe, JsonPipe } from '@angular/common';
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
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { TaskComponent } from './components/task/task.component';
import { Task, TaskStatus } from './models/task.model';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatTooltipModule, MatFormFieldModule, MatSelectModule, EllipsisTooltipDirective, TaskComponent, JsonPipe, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  readonly authStore = inject(AuthStore);
  private tasksService: TasksService = inject(TasksService);
  private dialog: MatDialog = inject(MatDialog);
  filter: WritableSignal<TaskStatus | 'all'> = signal<TaskStatus | 'all'>('all')
  user: InputSignal<User> = input.required<User>();
  tasks: Signal<Task[]> = computed(() => {
    const tasks = this.tasksService.tasks();
    if (this.filter() === 'all') return tasks;
    else return tasks.filter((f) => f.status === this.filter());
  });

  constructor() {
    effect(() => this.tasksService.getUserTask(this.user()._id));
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
        component: AddTaskDialogComponent,
        componentInputs: {
          'task': editTask || { userId: this.user()._id },
        },
        title: `${editTask ? 'Edit' : 'New'} Task`,
        content: `${this.user().name}'s task:`,
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
