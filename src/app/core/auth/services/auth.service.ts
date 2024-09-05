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

  signup(email: string, password: string, permission: Permission): Observable<void> {
    return this.httpService.post<void>(`${this.url}/signup`, { email, password, permission })
  }

  login(email: string, password: string): Observable<AuthUser> {
    return this.httpService.post<AuthUser>(`${this.url}/login`, { email, password });
  }

  logout() {
  }
}
