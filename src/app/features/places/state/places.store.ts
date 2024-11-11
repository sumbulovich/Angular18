import { computed, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalState, signalStore, type, withComputed, withMethods, withState } from "@ngrx/signals";
import { setAllEntities, withEntities } from "@ngrx/signals/entities";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { Place } from "../models/place.model";
import { PlacesService } from "../services/places.service";
import { RequestStatus, setCompleted, setError, setInProgress, setLoading } from "@app/shared/state/request-status.feature";

type PlacesState = {
  places: { requestStatus: RequestStatus },
  userPlaces: { requestStatus: RequestStatus }
}

const initialSate = signalState<PlacesState>({
  places: { requestStatus: 'idle' },
  userPlaces: { requestStatus: 'idle' },
})

export const PlacesStore = signalStore(
  // { providedIn: 'root' },   // Providing store at the root level.
  withEntities({ entity: type<Place>(), collection: 'places' }),
  withEntities({ entity: type<Place>(), collection: 'userPlaces' }),
  withState(initialSate),
  withComputed((store) => ({
    unselectedPlaces: computed(() => store.placesEntities()?.filter((f) => !store.userPlacesEntities().some((s) => s.id === f.id))),
    isLoading: computed(() => store.places().requestStatus === 'loading' || store.userPlaces().requestStatus === 'loading'),
  })),
  withMethods((store, placesService = inject(PlacesService)) => ({
    loadPlaces: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { places: setLoading() })),
          switchMap(() => {
            return placesService.getPlaces().pipe(
              tapResponse({
                next: (places: Place[]) => patchState(store, setAllEntities(places, { collection: 'places' })),
                error: (e: Error) => patchState(store, { places: setError(e.message) }),
                finalize: () => patchState(store, { places: setCompleted() })
              })
            );
          })
        )
      ),
      loadUserPlaces: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { userPlaces: setLoading() })),
          switchMap(() => {
            return placesService.getUserPlaces().pipe(
              tapResponse({
                next: (places: Place[]) => patchState(store, setAllEntities(places, { collection: 'userPlaces' })),
                error: (e: Error) => patchState(store, { userPlaces: setError(e.message) }),
                finalize: () => patchState(store, { userPlaces: setCompleted() })
              })
            );
          })
        )
      ),
      addUserPlace: rxMethod<Place>(
        pipe(
          tap(() => patchState(store, { userPlaces: setInProgress() })),
          switchMap((place: Place) => {
            return placesService.addUserPlace(place).pipe(
              tapResponse({
                next: (places: Place[]) => patchState(store, setAllEntities(places, { collection: 'userPlaces' })),
                error: (e: Error) => patchState(store, { userPlaces: setError(e.message) }),
                finalize: () => patchState(store, { userPlaces: setCompleted() })
              })
            );
          })
        )
      ),
      deleteUserPlace: rxMethod<Place>(
        pipe(
          tap(() => patchState(store, { userPlaces: setInProgress() })),
          switchMap((place: Place) => {
            return placesService.deleteUserPlace(place).pipe(
              tapResponse({
                next: (places: Place[]) => patchState(store, setAllEntities(places, { collection: 'userPlaces' })),
                error: (e: Error) => patchState(store, { userPlaces: setError(e.message) }),
                finalize: () => patchState(store, { userPlaces: setCompleted() })
              })
            );
          })
        )
      ),
  })),
);


