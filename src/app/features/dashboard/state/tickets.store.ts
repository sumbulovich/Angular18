import { inject } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalState, signalStore, withMethods, withState } from "@ngrx/signals";
import { SelectEntityId, setAllEntities, setEntities, withEntities } from "@ngrx/signals/entities";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { Ticket } from "../models/ticket.model";
import { TicketsService } from "../services/tickets.service";
import { setCompleted, setError, setLoading, withRequestStatus } from "@app/shared/state/request-status.feature";
import { withPagination } from "@app/shared/state/pagination.feature";


type TicketsState = {
  isEditing: boolean;
}

const initialSate = signalState<TicketsState>({
  isEditing: false
});

// Set custom Entity Identifier, by default is id
const selectId: SelectEntityId<Ticket> = (ticket) => ticket._id!;

export const TicketsStore = signalStore(
  { providedIn: 'root' },   // Providing store at the root level
  withEntities<Ticket>(), // Entries
  withState(initialSate), // Tickets State
  withRequestStatus(), // RequestStatus Feature
  withPagination(), // Pagination Feature
  withMethods((store, ticketsService = inject(TicketsService)) => ({
    loadTickets: rxMethod<PageEvent | undefined>(
      pipe(
        tap(() => patchState(store, setLoading())),
        switchMap((pageEvent?: PageEvent) => {
          return ticketsService.getTickets(pageEvent).pipe(
            tapResponse({
              next: ({ tickets, pageEvent }) => patchState(store, setAllEntities(tickets, { selectId }), { pageEvent }),
              error: (e: Error) => patchState(store, setError(e.message)),
              finalize: () => patchState(store, setCompleted())
            })
          );
        })
      )
    ),
    addTicket: rxMethod<Ticket>(
      pipe(
        tap(() => patchState(store, setLoading())),
        switchMap((ticket: Ticket) => {
          return ticketsService.addTicket(ticket).pipe(
            tapResponse({
              next: ({ tickets, pageEvent }) => patchState(store, setAllEntities(tickets, { selectId }), { pageEvent }),
              error: (e: Error) => patchState(store, setError(e.message)),
              finalize: () => patchState(store, setCompleted()),
            })
          );
        })
      )
    ),
    editTicket: rxMethod<Ticket>(
      pipe(
        tap(() => patchState(store, setLoading())),
        switchMap((ticket: Ticket) => {
          return ticketsService.editTicket(ticket).pipe(
            tapResponse({
              next: ({ tickets, pageEvent }) => patchState(store, setAllEntities(tickets, { selectId }), { pageEvent }),
              error: (e: Error) => patchState(store, setError(e.message)),
              finalize: () => patchState(store, setCompleted()),
            })
          );
        })
      )
    ),
    deleteTicket: rxMethod<Ticket>(
      pipe(
        tap(() => patchState(store, setLoading())),
        switchMap((ticket: Ticket) => {
          return ticketsService.deleteTicket(ticket._id!).pipe(
            tapResponse({
              next: ({ tickets, pageEvent }) => patchState(store, setAllEntities(tickets, { selectId }), { pageEvent }),
              error: (e: Error) => patchState(store, setError(e.message)),
              finalize: () => patchState(store, setCompleted()),
            })
          );
        })
      )
    ),
    setEditing(isEditing: boolean): void {
      patchState(store, { isEditing })
    }
  })),
);


