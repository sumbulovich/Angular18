import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from '@app/core/http/services/http.service';
import { Ticket } from '../models/ticket.model';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = `${environment.apiUrl}/api/tickets`;

  constructor() { }

  getTickets(pageEvent?: PageEvent): Observable<{ tickets: Ticket[]; pageEvent: PageEvent; }> {
    let query: string = '';
    if (pageEvent) query = new URLSearchParams(pageEvent as any).toString();
    return this.httpService.get<{ tickets: Ticket[], pageEvent: PageEvent }>(`${this.url}?${query}`)
  }


  addTicket(ticket: Ticket): Observable<{ tickets: Ticket[]; pageEvent: PageEvent; }> {
    const ticketData = new FormData(); // Accept File
    Object.entries(ticket).forEach(([key, value]) => ticketData.append(key, value));
    return this.httpService.post<{ tickets: Ticket[]; pageEvent: PageEvent; }>(`${this.url}`, ticketData)
  }

  editTicket(ticket: Ticket): Observable<{ tickets: Ticket[]; pageEvent: PageEvent; }> {
    const ticketData = new FormData(); // Accept File
    Object.entries(ticket).forEach(([key, value]) => ticketData.append(key, value));
    return this.httpService.put<{ tickets: Ticket[]; pageEvent: PageEvent }>(`${this.url}`, ticketData)
  }

  deleteTicket(ticket: Ticket): Observable<{ tickets: Ticket[]; pageEvent: PageEvent }> {
    return this.httpService.delete<{ tickets: Ticket[]; pageEvent: PageEvent }>(`${this.url}/${ticket._id}`)
  }
}
