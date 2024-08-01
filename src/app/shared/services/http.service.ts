import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  get<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<T> {
    return this.httpClient.get<T>(url, { params, headers });
  }

  put<T>(
    url: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<T> {
    return this.httpClient.put<T>(url, body, { params, headers });
  }
}
