import { Component, InputSignal, input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  user: InputSignal<User> = input.required<User>()
}
