import { HttpErrorResponse } from "@angular/common/http";
import { computed, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, pipe, switchMap, tap, throwError } from "rxjs";
import { Place } from "../models/place.model";
import { PlacesService } from "../services/places.service";
import { SnackbarService } from './../../../shared/services/snackbar.service';

type Data<T> = {
  data: T;
  isLoading: boolean;
  error: string | undefined;
}
type PlacesState = {
  places: Data<Place[]>;
  userPlaces: Data<Place[]>;
  inProgress: boolean;
}

const initialData = {
  data: [],
  isLoading: false,
  error: undefined
}

const initialSate = signalState<PlacesState>({
  places: initialData,
  userPlaces: initialData,
  inProgress: false,
})

export const PlacesStore = signalStore(
  // Providing store at the root level.
  { providedIn: 'root' },
  withState(initialSate),
  withComputed((state) => ({
    unselectedPlaces: computed(() => ({ data: state.places().data?.filter((f) => !state.userPlaces().data.some((s) => s.id === f.id)) })),
    isLoading: computed(() => state.places().isLoading || state.userPlaces().isLoading),
  })),
  withMethods((placesState, placesService = inject(PlacesService), snackbarService = inject(SnackbarService)) => ({
    loadPlaces: rxMethod<void>(
      pipe(
        tap(() => patchState(placesState, (state) => ({ places: { ...state.places, isLoading: true, error: undefined } }))),
        switchMap(() => {
          return placesService.getPlaces().pipe(
            catchError((e: HttpErrorResponse) => throwError(() => new Error(`Something went wrong (${e.status})`))),
            tapResponse({
              next: (places?: Place[]) => patchState(placesState, (state) => ({ places: { ...state.places, data: places || [] } })),
              error: (e: Error) => {
                patchState(placesState, (state) => ({ places: { ...state.places, isLoading: false, error: e.message } }));
                snackbarService.open('error', 'Error getting places', e?.message);
              },
              finalize: () => patchState(placesState, (state) => ({ places: { ...state.places, isLoading: false } }))
            })
          );
        })
      )
    ),
    loadUserPlaces: rxMethod<void>(
      pipe(
        tap(() => patchState(placesState, (state) => ({ userPlaces: { ...state.userPlaces, isLoading: true, error: undefined } }))),
        switchMap(() => {
          return placesService.getUserPlaces().pipe(
            catchError((e: HttpErrorResponse) => throwError(() => new Error(`Something went wrong (${e.status})`))),
            tapResponse({
              next: (places?: Place[]) => patchState(placesState, (state) => ({ userPlaces: { ...state.userPlaces, data: places || [] } })),
              error: (e: Error) => {
                patchState(placesState, (state) => ({ userPlaces: { ...state.userPlaces, isLoading: false, error: e.message } }));
                snackbarService.open('error', 'Error getting user places', e?.message);
              },
              finalize: () => patchState(placesState, (state) => ({ userPlaces: { ...state.userPlaces, isLoading: false } }))
            })
          );
        })
      )
    ),
    addUserPlace: rxMethod<Place>(
      pipe(
        tap(() => patchState(placesState, { inProgress: true })),
        switchMap((place: Place) => {
          return placesService.addUserPlace(place).pipe(
            catchError((e: HttpErrorResponse) => throwError(() => new Error(`Something went wrong (${e.status})`))),
            tapResponse({
              next: (places: Place[]) => patchState(placesState, (state) => ({ userPlaces: { ...state.userPlaces, data: places } })),
              error: (e: Error) => {
                patchState(placesState, { inProgress: false });
                snackbarService.open('error', 'Error adding user place', e?.message);
              },
              finalize: () => patchState(placesState, { inProgress: false }),
            })
          );
        })
      )
    ),
  })),
);


