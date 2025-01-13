import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DUMMY_USERS } from './constants/dummy-users';
import { User } from './models/user.model';


@Component({
  standalone: true,
  imports: [UserComponent, RouterOutlet],
  templateUrl: './tasks-management.component.html',
  styleUrl: './tasks-management.component.scss'
})
export class TasksManagementComponent {
  users: User[] = DUMMY_USERS;
}
