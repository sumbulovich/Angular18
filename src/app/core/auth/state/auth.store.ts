import { computed, inject } from "@angular/core";
import { patchState, signalState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { createFeature, createReducer, on } from "@ngrx/store";
import { pipe, switchMap, tap } from "rxjs";
import { Permission } from "../models/permission.model";
import { AuthService } from "../services/auth.service";
import { AuthActions } from "./auth.actions";


type AuthState = {
  permission: Permission;
  inProgress: boolean;
  error: string | undefined;
}

const initialSate = signalState<AuthState> ({
  permission: 'guest',
  inProgress: false,
  error: undefined
})

export const AuthStore = signalStore(
  // Providing store at the root level.
  { providedIn: 'root' },
  withState(initialSate),
  withComputed((store) => ({
    isAuth: computed(() => store.permission() !== 'guest'),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    login: rxMethod<{ email: string, password: string }>(
      pipe(
        tap(() => patchState(store, { inProgress: true, error: undefined })),
        switchMap(({ email, password }) => {
          return authService.login(email, password).pipe(
            tapResponse({
              next: (permission) => patchState(store, { permission }),
              error: console.error,
              finalize: () => patchState(store, { inProgress: false }),
            })
          );
        })
      )
    ),
    logout(): void {
      patchState(store, { permission: 'guest' });
    },
  }))
);


