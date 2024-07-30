import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, InputSignal, effect, inject, input, computed, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { TaskComponent } from './components/task/task.component';
import { DUMMY_TASKS } from './constants/dummy-tasks';
import { Task, TaskStatus } from './models/task.model';
import { TasksService } from './services/tasks.service';
import { Observable, take } from 'rxjs';
import { User } from '../../models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatTooltipModule, MatFormFieldModule, MatSelectModule, EllipsisTooltipDirective, TaskComponent, JsonPipe, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  private tasksService: TasksService = inject(TasksService);
  private dialog: MatDialog = inject(MatDialog);
  filter: WritableSignal<TaskStatus | 'all'> = signal<TaskStatus | 'all'>('all')
  user: InputSignal<User> = input.required<User>();
  tasks = computed(() => {
    const tasks = this.tasksService.getUserTask(this.user().id);
    if (this.filter() === 'all') return tasks;
    else return tasks.filter((f) => f.status === this.filter());
  });

  editTask(task: Task): void {
    this.tasksService.editTask(task);
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task);
  }

  openAddTaskDialog(editTask?: Task): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: editTask || { userId: this.user().id, id: DUMMY_TASKS.length + 1 },
    });
    dialogRef.componentInstance.data = {
      component: AddTaskDialogComponent,
      title: `${editTask ? 'Edit' : 'New'} Task`,
      content: `${this.user().name}'s task:`,
      btnText: `${editTask ? 'Save' : 'Add'}`
    };
    dialogRef.afterClosed().pipe(take(1)).subscribe((task?: Task) => {
      if (!task) return;
      if (editTask) this.tasksService.editTask(task);
      else this.tasksService.addTask(task);
    });
  }
}
