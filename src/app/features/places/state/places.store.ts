import { computed, effect, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { getState, patchState, signalState, signalStore, signalStoreFeature, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { Place } from "../models/place.model";
import { PlacesService } from "../services/places.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "@app/shared/components/snackbar/snackbar.component";


type PlacesState = {
  places: Place[];
  isLoading: boolean;
  error: string | undefined;
}

const initialSate = signalState<PlacesState>({
  places: [],
  isLoading: false,
  error: undefined
})

export const PlacesStore = signalStore(
  // Providing store at the root level.
  { providedIn: 'root' },
  withState(initialSate),
  withMethods((store, placesService = inject(PlacesService), snackBar = inject(MatSnackBar)) => ({
    get: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: undefined })),
        switchMap(() => {
          return placesService.getPlaces().pipe(
            tapResponse({
              next: (places: Place[]) => patchState(store, { places }),
              error: (e: HttpErrorResponse) => {
                patchState(store, { isLoading: false, error: e.error.message || e.message });
                console.error(e)
                const snackBarRef = snackBar.openFromComponent(SnackbarComponent, {
                  duration: 2000,
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                  data: {
                    title:  'Error getting places',
                    content: e.error.message,
                    type: 'error'
                  }
                });
              },
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  })),
);


