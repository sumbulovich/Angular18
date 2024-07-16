import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, InputSignal, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { User } from '../users/models/user.model';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { TaskComponent } from './components/task/task.component';
import { DUMMY_TASKS } from './constants/dummy-tasks';
import { Task } from './models/task.model';
import { TasksService } from './services/tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatTooltipModule, EllipsisTooltipDirective, TaskComponent, JsonPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  user: InputSignal<User> = input.required<User>();
  tasks$?: Observable<Task[]>;
  readonly dialog = inject(MatDialog);

  constructor(private tasksService: TasksService) {
    // Detect signal subscriptions
    effect((onCleanup) => {
      this.tasks$ = this.tasksService.getUserTask(this.user().id)
      onCleanup(() => console.log('Signal Effects Cleanup executed'))
    });
  }

  completeTask(task: Task): void {
    this.tasksService.completeTask(task);
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task);
  }

  openAddTaskDialog(editTask?: Task): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: editTask || { userId: this.user().id, id: DUMMY_TASKS.length + 1 },
    });
    dialogRef.componentInstance.dialogData = {
      component: AddTaskDialogComponent,
      title: `${editTask ? 'Edit' : 'New'} Task`,
      content: `${this.user().name}'s task:`,
      btnText: `${editTask ? 'Save' : 'Add'}`
    };
    dialogRef.afterClosed().subscribe((task?: Task) => {
      if (!task) return;
      if (editTask) this.tasksService.editTask(task);
      else this.tasksService.addTask(task);
    });
  }
}
