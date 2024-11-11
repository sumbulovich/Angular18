import { inject } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { withPagination } from "@app/shared/state/pagination.feature";
import { setCompleted, setError, setLoading, withRequestStatus } from "@app/shared/state/request-status.feature";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalState, signalStore, signalStoreFeature, withHooks, withMethods, withState } from "@ngrx/signals";
import { SelectEntityId, setAllEntities, setEntity, withEntities } from "@ngrx/signals/entities";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { Ticket } from "../models/ticket.model";
import { TicketsService } from "../services/tickets.service";
import { withStorageSync } from "@app/shared/state/storage-sync.feature";


type TicketsState = {
  isEditing: boolean;
}

const initialSate = signalState<TicketsState>({
  isEditing: false
});

// Set custom Entity Identifier, by default is id
const selectId: SelectEntityId<Ticket> = (ticket) => ticket._id!;


export const TicketsStore = signalStore(
  // { providedIn: 'root' },   // Providing store at the root level
  withEntities<Ticket>(), // Entries
  withState(initialSate), // Tickets State
  withRequestStatus(), // RequestStatus Feature
  withPagination(), // Pagination Feature
  withStorageSync('ticketsState', 'pageEvent'), // Storage Sync Feature (save/load state)
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
    loadTicket: rxMethod<string>(
      pipe(
        tap(() => patchState(store, setLoading())),
        switchMap((ticketId: string) => {
          return ticketsService.getTicket(ticketId).pipe(
            tapResponse({
              next: (ticket) => patchState(store, setEntity(ticket, { selectId })),
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
      patchState(store, { isEditing });
    }
  })),
  withHooks({
    onInit(store) {
      store.loadTickets(store.pageEvent());
    }
  }),
);


