import { Component, InputSignal, ModelSignal, OutputEmitterRef, inject, input, model, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { Task, TaskStatus } from '../../models/task.model';
import { DatePipe } from '@angular/common';
import { AuthStore } from '@app/core/auth/state/auth.store';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTooltipModule, EllipsisTooltipDirective, DatePipe, MatTooltipModule, MatSelectModule, MatFormFieldModule],
  // providers: [AuthStore],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  task: ModelSignal<Task> = model.required<Task>();
  delete: OutputEmitterRef<void> = output<void>();
  edit: OutputEmitterRef<void> = output<void>()

  readonly today: Date = new Date();
  readonly authStore = inject(AuthStore);

  updateStatus(status: TaskStatus): void {
    this.task.update((task) => ({ ...task, status }));
  }
}
