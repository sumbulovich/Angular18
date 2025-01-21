import { Component, input, InputSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DUMMY_USERS } from './constants/dummy-users';
import { User } from './models/user.model';
import { InfoComponent } from "../../shared/components/info/info.component";


@Component({
  standalone: true,
  imports: [UserComponent, RouterOutlet, InfoComponent],
  templateUrl: './tasks-management.component.html',
  styleUrl: './tasks-management.component.scss'
})
export class TasksManagementComponent {
  title: InputSignal<string | undefined> = input<string>(); // Data
  users: User[] = DUMMY_USERS;
}
