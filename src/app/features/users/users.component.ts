import * as CryptoJS from 'crypto-js';
import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { UserComponent } from './component/user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { User } from './models/user';


@Component({
  standalone: true,
  imports: [UserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  selectedUser: WritableSignal<User> = signal(DUMMY_USERS[0]);
  users: User[] = DUMMY_USERS;
}
