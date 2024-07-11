import { Component, InputSignal, OutputEmitterRef, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { Task } from '../../models/task.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgClass, MatCardModule, MatButtonModule, MatTooltipModule, EllipsisTooltipDirective, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  task: InputSignal<Task> = input.required<Task>();
  delete: OutputEmitterRef<void> = output<void>();
  edit: OutputEmitterRef<void> = output<void>()
  complete: OutputEmitterRef<void> = output<void>();
  readonly today: Date = new Date();
}
