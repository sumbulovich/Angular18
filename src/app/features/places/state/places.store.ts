import { computed, inject } from "@angular/core";
import { setCompleted, setError, setLoading, withRequestStatus } from "@app/shared/state/request-status.feature";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalStore, type, withComputed, withMethods } from "@ngrx/signals";
import { setAllEntities, withEntities } from "@ngrx/signals/entities";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { Place } from "../models/place.model";
import { PlacesService } from "../services/places.service";
import { UserPlacesStore } from "./userPlaces.store";


export const PlacesStore = signalStore(
  // { providedIn: 'root' },   // Providing store at the root level.
  withEntities({ entity: type<Place>(), collection: 'places' }),
  withRequestStatus(),
  withComputed((store, userPlacesStore = inject(UserPlacesStore)) => ({
    unselectedPlaces: computed(() => store.placesEntities()?.filter((f) => !userPlacesStore.userPlacesEntities().some((s) => s.id === f.id))),
    areLoading: computed(() => store.isLoading() || userPlacesStore.isLoading()),
  })),
  withMethods((store, placesService = inject(PlacesService)) => ({
    loadPlaces: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading())),
        switchMap(() => {
          return placesService.getPlaces().pipe(
            tapResponse({
              next: (places: Place[]) => patchState(store, setAllEntities(places, { collection: 'places' })),
              error: (e: Error) => patchState(store, setError(e.message)),
              finalize: () => patchState(store, setCompleted())
            })
          );
        })
      )
    ),
  })),
);
