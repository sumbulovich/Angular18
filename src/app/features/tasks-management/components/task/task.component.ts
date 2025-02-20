import { DatePipe, JsonPipe } from '@angular/common';
import {
  Component,
  computed,
  input,
  InputSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { Task, TaskStatus } from '../../models/task.model';
import { AuthUser } from '@app/core/auth/models/authUser.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    EllipsisTooltipDirective,
    DatePipe,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    JsonPipe,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  authUser: InputSignal<Partial<AuthUser> | undefined> =
    input<Partial<AuthUser>>();
  task: ModelSignal<Task> = model.required<Task>();
  delete: OutputEmitterRef<void> = output<void>();
  edit: OutputEmitterRef<void> = output<void>();
  isExpired = computed(
    () => new Date(this.task().dueDate).getTime() < new Date().getTime(),
  );

  updateStatus(status: TaskStatus): void {
    this.task.update((task) => ({ ...task, status }));
  }
}
