import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpService } from '@app/core/http/services/http.service';
import { Observable, delay, map, of } from 'rxjs';
import { AuthUser, Permission } from '../models/authUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = 'http://localhost:3000/api/auth';
  activePermission: WritableSignal<Permission> = signal<Permission>('guest');

  login(email: string, password: string): Observable<AuthUser> {
    let permission: Permission = 'guest'
    if (email === 'admin@example.com' && password === 'admin') {
      permission = 'admin';
    } else if (email === 'user@example.com' && password === 'user') {
      permission = 'user';
    } else {
      permission = 'guest';
    }
    return of({ email, password, permission }).pipe(delay(500));
  }

  logout() {
    this.activePermission.set('guest');
  }

  signup(user: AuthUser): Observable<AuthUser> {
    return this.httpService.post<{ user: AuthUser }>(`${this.url}/signup`, user)
      .pipe((map((m) => m.user)))
  }
}
