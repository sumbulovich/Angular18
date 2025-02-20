import { inject } from '@angular/core';
import {
  setCompleted,
  setError,
  setInProgress,
  setLoading,
  withRequestStatus,
} from '@app/shared/state/request-status.feature';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, type, withMethods } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Place } from '../models/place.model';
import { PlacesService } from '../services/places.service';

export const UserPlacesStore = signalStore(
  // { providedIn: 'root' },   // Providing store at the root level.
  withEntities({ entity: type<Place>(), collection: 'userPlaces' }),
  withRequestStatus(),
  withMethods((store, placesService = inject(PlacesService)) => ({
    loadUserPlaces: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading())),
        switchMap(() => {
          return placesService.getUserPlaces().pipe(
            tapResponse({
              next: (places: Place[]) =>
                patchState(
                  store,
                  setAllEntities(places, { collection: 'userPlaces' }),
                ),
              error: (e: Error) => patchState(store, setError(e.message)),
              finalize: () => patchState(store, setCompleted()),
            }),
          );
        }),
      ),
    ),
    addUserPlace: rxMethod<Place>(
      pipe(
        tap(() => patchState(store, setInProgress())),
        switchMap((place: Place) => {
          return placesService.addUserPlace(place).pipe(
            tapResponse({
              next: (places: Place[]) =>
                patchState(
                  store,
                  setAllEntities(places, { collection: 'userPlaces' }),
                ),
              error: (e: Error) => patchState(store, setError(e.message)),
              finalize: () => patchState(store, setCompleted()),
            }),
          );
        }),
      ),
    ),
    deleteUserPlace: rxMethod<Place>(
      pipe(
        tap(() => patchState(store, setInProgress())),
        switchMap((place: Place) => {
          return placesService.deleteUserPlace(place).pipe(
            tapResponse({
              next: (places: Place[]) =>
                patchState(
                  store,
                  setAllEntities(places, { collection: 'userPlaces' }),
                ),
              error: (e: Error) => patchState(store, setError(e.message)),
              finalize: () => patchState(store, setCompleted()),
            }),
          );
        }),
      ),
    ),
  })),
);
