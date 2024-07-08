import { Component, InputSignal, OnInit, Signal, computed, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { User } from '../users/models/user.model';
import { TaskComponent } from './components/task/task.component';
import { Task } from './models/task.model';
import { DUMMY_TASKS } from './constants/dummy-tasks';
import { JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatTooltipModule, EllipsisTooltipDirective, TaskComponent, JsonPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  user: InputSignal<User> = input.required<User>();
  completedTasks: Task[] = [];
  deletedTasks: Task[] = [];
  tasks: Task[] = [];
  readonly dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.tasks = DUMMY_TASKS.filter((f) => f.userId === this.user().id);
    })
  }

  completeTask(task: Task): void {
    this.completedTasks.push(task);
    this.tasks = this.tasks.filter((f) => f.id !== task.id);
  }

  deleteTask(task: Task): void {
    this.deletedTasks.push(task);
    this.tasks = this.tasks.filter((f) => f.id !== task.id);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: { userId: this.user().id, id: DUMMY_TASKS.length + 1 }
    });
    dialogRef.afterClosed().subscribe((task?: Task) => {
      if (task) this.addTask(task)
    });
  }
}
