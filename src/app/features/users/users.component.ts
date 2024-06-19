import { Component, WritableSignal, signal } from '@angular/core';
import { UserComponent } from './component/user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { User } from './models/user';
import { TasksComponent } from './component/tasks/tasks.component';


@Component({
  standalone: true,
  imports: [UserComponent, TasksComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  selectedUser: WritableSignal<User> = signal(DUMMY_USERS[0]);
  users: User[] = DUMMY_USERS;
}
