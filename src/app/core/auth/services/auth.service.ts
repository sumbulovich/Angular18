import { Injectable, signal } from '@angular/core';
import { Permission } from '../models/permission.model';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  activePermission = signal<Permission>('guest');

  login(email: string, password: string): Observable<Permission> {
    let permission: Permission = 'guest'
    if (email === 'admin@example.com' && password === 'admin') {
      permission = 'admin';
    } else if (email === 'user@example.com' && password === 'user') {
      permission = 'user';
    } else {
      permission = 'guest';
    }
    return of(permission).pipe(delay(500));
  }

  logout() {
    this.activePermission.set('guest');
  }
}
