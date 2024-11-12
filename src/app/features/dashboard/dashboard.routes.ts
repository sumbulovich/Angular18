import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivateFn, ResolveFn, RouterStateSnapshot, Routes } from '@angular/router';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { filter } from 'rxjs';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { Ticket } from './models/ticket.model';
import { TicketsStore } from './state/tickets.store';

const resolveUser: ResolveFn<Ticket | undefined> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const ticketsStore = inject(TicketsStore);
  const ticketId = activatedRoute.paramMap.get('ticketId');
  if (ticketId) ticketsStore.setSelectedEntityId(ticketId);
  if (!ticketsStore.selectedEntity()) ticketsStore.loadTicket(ticketId!);
  return toObservable(ticketsStore.selectedEntity).pipe(filter((f) => !!f));
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

