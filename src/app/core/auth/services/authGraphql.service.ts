import { query } from 'express';
import { Injectable, inject } from '@angular/core';
import { HttpService } from '@app/core/http/services/http.service';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { AuthUser } from '../models/authUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGraphqlService {
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = `${environment.apiUrl}/graphql`;

  signup(user: Partial<AuthUser>): Observable<void> {
    const query = `
      mutation Signup($email: String = "", $lastName: String = "", $name: String = "", $password: String = "") {
        signup(email: $email, lastName: $lastName, name: $name, password: $password)
      }
    `;
    const variables = { ...user };
    return this.httpService
      .post<void>(this.url, { query, variables })
      .pipe(map((res: any) => res.data.signup));
  }

  login(email: string, password: string): Observable<AuthUser> {
    const query = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token,
          expiration
          email
          name
          lastName
          permission
        }
      }
    `;
    const variables = { email, password };
    return this.httpService
      .post<AuthUser>(this.url, { query, variables })
      .pipe(map((res: any) => res.data.login));
  }

  loadProfile(): Observable<AuthUser> {
    const query = `
      query GetProfile {
        getProfile {
          email
          lastName
          name
          permission
        }
      }
    `;
    return this.httpService
      .post<AuthUser>(this.url, { query })
      .pipe(map((res: any) => res.data.getProfile));
  }

  updateProfile(name: string, lastName: string): Observable<void> {
    const query = `
      mutation EditProfile($lastName: String = "", $name: String = "") {
        editProfile(lastName: $lastName, name: $name) {
          _id
        }
      }
    `;
    const variables = { name, lastName };
    return this.httpService.post<void>(this.url, { query, variables });
  }
}
