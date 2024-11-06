import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, Routes } from '@angular/router';
import { Ticket } from './models/ticket.model';
import { inject } from '@angular/core';
import { TicketsStore } from './state/tickets.store';
import { TicketsService } from './services/tickets.service';
import { catchError, Observable, of } from 'rxjs';

const resolveUser: ResolveFn<Ticket | undefined> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<Ticket | undefined> => {
  const ticketsStore = inject(TicketsStore);
  const ticketsService = inject(TicketsService);
  const ticketId = activatedRoute.paramMap.get('ticketId');
  if (!ticketId) return of();
  const ticket = ticketsStore.entityMap()[ticketId]
  if (!ticket) return ticketsService.getTicket(ticketId).pipe(catchError((e) => of()));
  return of(ticket);
}

export const routes: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./components/add-ticket/add-ticket.component').then(m => m.AddTicketComponent),
  },
  {
    path: ':ticketId',
    loadComponent: () => import('./components/add-ticket/add-ticket.component').then(m => m.AddTicketComponent),
    resolve: {
      ticket: resolveUser
    }
  }
];

export default routes;

