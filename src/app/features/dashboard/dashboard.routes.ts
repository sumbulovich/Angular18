import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, CanDeactivateFn, ResolveFn, RouterStateSnapshot, Routes } from '@angular/router';
import { Ticket } from './models/ticket.model';
import { inject } from '@angular/core';
import { TicketsStore } from './state/tickets.store';
import { TicketsService } from './services/tickets.service';
import { catchError, map, Observable, of } from 'rxjs';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { DiscardChangesDirective } from '@app/shared/directives/discardChanges.directive';
import { MatDialog } from '@angular/material/dialog';

const resolveUser: ResolveFn<Ticket | undefined> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<Ticket | undefined> => {
  const ticketsStore = inject(TicketsStore);
  const ticketsService = inject(TicketsService);
  const ticketId = activatedRoute.paramMap.get('ticketId');
  if (!ticketId) return of();
  const ticket = ticketsStore.entityMap()[ticketId]
  if (!ticket) return ticketsService.getTicket(ticketId).pipe(catchError((e) => of()));
  return of(ticket);
}

const canDeactivate: CanDeactivateFn<AddTicketComponent> = (component) => {
  if (component.isFormUpdated()) {
    const dialog = inject(MatDialog);
    const dialogRef = dialog.open(DialogComponent, {
      data: {
        title: 'Discard changes',
        content: 'Do you want discard changes?',
        btnText: 'Discard'
      }
    });
    // DialogComponent returns true or false
    return dialogRef.afterClosed();
  }
  return !component.isFormUpdated()
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/tickets-list/tickets-list.component').then(m => m.TicketsListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./components/add-ticket/add-ticket.component').then(m => m.AddTicketComponent),
    canDeactivate: [canDeactivate]
  },
  {
    path: ':ticketId',
    loadComponent: () => import('./components/add-ticket/add-ticket.component').then(m => m.AddTicketComponent),
    canDeactivate: [canDeactivate],
    resolve: {
      ticket: resolveUser
    }
  }
];

export default routes;

