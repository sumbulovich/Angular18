import { Component, WritableSignal, signal } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { DUMMY_USERS } from './constants/dummy-users';
import { User } from './models/user.model';
import { TasksComponent } from './components/tasks/tasks.component';


@Component({
  standalone: true,
  imports: [UserComponent, TasksComponent],
  templateUrl: './tasks-management.component.html',
  styleUrl: './tasks-management.component.scss'
})
export class TasksManagementComponent {
  selectedUser: WritableSignal<User> = signal(DUMMY_USERS[0]);
  users: User[] = DUMMY_USERS;
}
