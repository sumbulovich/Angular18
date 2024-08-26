import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from '@app/core/http/services/http.service';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = 'http://localhost:3000';

  constructor() { }

  getTickets(): Observable<Ticket[]> {
    return this.httpService.get<{ tickets: Ticket[] }>(`${this.url}/tickets`)
      .pipe((map((m) => m.tickets)));
  }


  addTicket(ticket: Ticket): Observable<Ticket[]> {
    return this.httpService.post<{ tickets: Ticket[] }>(`${this.url}/tickets`, ticket)
      .pipe((map((m) => m.tickets)));
  }

  editTicket(ticket: Ticket): Observable<Ticket[]> {
    return this.httpService.put<{ tickets: Ticket[] }>(`${this.url}/tickets`, ticket)
      .pipe((map((m) => m.tickets)));
  }

  deleteTicket(ticket: Ticket): Observable<Ticket[]> {
    return this.httpService.delete<{ tickets: Ticket[] }>(`${this.url}/tickets/${ticket._id}`)
      .pipe((map((m) => m.tickets)));
  }
}
