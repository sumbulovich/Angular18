import { Component, InputSignal, input } from '@angular/core';
import { User } from '../../models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatTooltipModule, EllipsisTooltipDirective, TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  user: InputSignal<User> = input.required<User>()
}
