import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HttpService } from '@app/shared/services/http.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  httpService: HttpService = inject(HttpService);
  constructor() { }

  getCurrency(): Observable<{ [key: string]: number }> {
    const url: string = 'https://api.freecurrencyapi.com/v1/latest';
    const params: HttpParams = new HttpParams()
      .set('apikey', 'fca_live_bLGkCjSCRXAUOCto9Gb7Vqd0tnF1QaEz6qDo6sKQ')
      .set('currencies', 'EUR,USD,GBP')
      .set('base_currency', 'EUR');
    return this.httpService.get<{ data: { [key: string]: number } }>(url, params)
      .pipe((map((m) => m.data)));
  }
}
