import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HttpService } from '@app/core/http/services/http.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  httpService: HttpService = inject(HttpService);
  constructor() { }

  getCurrency(): Observable<Record<string, number>> {
    const url: string = 'https://api.freecurrencyapi.com/v1/latest';
    const params: HttpParams = new HttpParams()
      .set('apikey', 'fca_live_bLGkCjSCRXAUOCto9Gb7Vqd0tnF1QaEz6qDo6sKQ')
      .set('currencies', 'EUR,USD,GBP')
      .set('base_currency', 'EUR');
    return this.httpService.get<{ data: Record<string, number> }>(url, params)
      .pipe((map((m) => m.data)));
  }
}
