import { inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { Ticket } from "../components/tickets/models/ticket.model";
import { TicketsService } from "../components/tickets/services/tickets.service";

type Data<T> = {
  data: T;
  isLoading: boolean;
  error: string | undefined;
}
type TicketsState = {
  tickets: Data<Ticket[]>;
  inProgress: boolean;
  error: string | undefined;
}

const initialData = {
  data: [],
  isLoading: false,
  error: undefined
}

const initialSate = signalState<TicketsState>({
  tickets: initialData,
  inProgress: false,
  error: undefined
})

export const TicketsStore = signalStore(
  // Providing store at the root level.
  { providedIn: 'root' },
  withState(initialSate),
  withMethods((placesState, ticketsService = inject(TicketsService)) => ({
    loadTickets: rxMethod<void>(
      pipe(
        tap(() => patchState(placesState, (state) => ({ tickets: { ...state.tickets, isLoading: true, error: undefined } }))),
        switchMap(() => {
          return ticketsService.getTickets().pipe(
            tapResponse({
              next: (tickets?: Ticket[]) => patchState(placesState, (state) => ({ tickets: { ...state.tickets, data: tickets || [] } })),
              error: (e: Error) => patchState(placesState, (state) => ({ tickets: { ...state.tickets, isLoading: false, error: e.message } })),
              finalize: () => patchState(placesState, (state) => ({ tickets: { ...state.tickets, isLoading: false } }))
            })
          );
        })
      )
    ),
    addTicket: rxMethod<Ticket>(
      pipe(
        tap(() => patchState(placesState, { inProgress: true, error: undefined })),
        switchMap((ticket: Ticket) => {
          return ticketsService.addTicket(ticket).pipe(
            tapResponse({
              next: (tickets: Ticket[]) => patchState(placesState, (state) => ({ tickets: { ...state.tickets, data: tickets } })),
              error: (e: Error) => patchState(placesState, { inProgress: false, error: e.message }),
              finalize: () => patchState(placesState, { inProgress: false }),
            })
          );
        })
      )
    ),
    editTicket: rxMethod<Ticket>(
      pipe(
        tap(() => patchState(placesState, { inProgress: true, error: undefined })),
        switchMap((ticket: Ticket) => {
          return ticketsService.editTicket(ticket).pipe(
            tapResponse({
              next: (tickets: Ticket[]) => patchState(placesState, (state) => ({ tickets: { ...state.tickets, data: tickets } })),
              error: (e: Error) => patchState(placesState, { inProgress: false, error: e.message }),
              finalize: () => patchState(placesState, { inProgress: false }),
            })
          );
        })
      )
    ),
    deleteTicket: rxMethod<Ticket>(
      pipe(
        tap(() => patchState(placesState, { inProgress: true })),
        switchMap((ticket: Ticket) => {
          return ticketsService.deleteTicket(ticket).pipe(
            tapResponse({
              next: (tickets: Ticket[]) => patchState(placesState, (state) => ({ tickets: { ...state.tickets, data: tickets } })),
              error: (e: Error) => patchState(placesState, { inProgress: false }),
              finalize: () => patchState(placesState, { inProgress: false }),
            })
          );
        })
      )
    ),
  })),
);


