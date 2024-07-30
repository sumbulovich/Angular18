import { computed, effect, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { getState, patchState, signalState, signalStore, signalStoreFeature, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { Permission } from "../models/permission.model";
import { AuthService } from "../services/auth.service";


type AuthState = {
  permission: Permission;
  inProgress: boolean;
  error: string | undefined;
}

const initialSate = signalState<AuthState>({
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
              next: (permission: Permission) => patchState(store, { permission }),
              error: (error: string) => {
                patchState(store, { inProgress: false, error });
                console.error(error);
              },
              finalize: () => patchState(store, { inProgress: false }),
            })
          );
        })
      )
    ),
    logout(): void {
      patchState(store, { permission: 'guest' });
    },
  })),
  withHooks({
    onInit(store) {
      console.log('AuthStore init', getState(store))
    },
    onDestroy(store) {
      console.log('AuthStore destroy', getState(store));
    },
  }),
  withCustomFeature('Auth')
);

export function withCustomFeature(name: any) {
  return signalStoreFeature(
    withState(initialSate),
    withComputed(() => ({})),
    withMethods(() => ({})),
    withHooks({
      onInit(store) {
        effect(() => {
          console.log(`${name} state changed`, getState(store));
        });
      },
    })
  );
}


