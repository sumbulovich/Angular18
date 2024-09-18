import { computed, effect, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { getState, patchState, signalState, signalStore, signalStoreFeature, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { AuthUser, Permission } from "../models/authUser.model";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";


type AuthState = {
  user: AuthUser | undefined,
  inProgress: boolean;
  error: string | undefined;
}

const initialSate = signalState<AuthState>({
  user: undefined,
  inProgress: false,
  error: undefined
})

export const AuthStore = signalStore(
  // Providing store at the root level.
  { providedIn: 'root' },
  withState(initialSate),
  withComputed((authState) => ({
    isAuth: computed(() => !!authState.user()),
  })),
  withMethods((authState, authService = inject(AuthService), router = inject(Router)) => ({
    login: rxMethod<{ email: string, password: string }>(
      pipe(
        tap(() => patchState(authState, { inProgress: true, error: undefined })),
        switchMap(({ email, password }) => {
          return authService.login(email, password).pipe(
            tapResponse({
              next: (user: AuthUser) => patchState(authState, { user }),
              error: (error: string) => patchState(authState, { inProgress: false, error }),
              finalize: () => patchState(authState, { inProgress: false }),
            })
          );
        })
      )
    ),
    signup: rxMethod<{ email: string, password: string, permission: Permission }>(
      pipe(
        tap(() => patchState(authState, { inProgress: true, error: undefined })),
        switchMap(({ email, password, permission }) => {
          return authService.signup(email, password, permission).pipe(
            tapResponse({
              next: () => router.navigate([], { queryParams: { success: email }}),
              error: (error: string) => patchState(authState, { inProgress: false, error }),
              finalize: () => patchState(authState, { inProgress: false }),
            })
          );
        })
      )
    ),
    logout(error?: string): void {
      patchState(authState, { user: undefined });
      router.navigate(['login'], { queryParams: { error }})
    },
  })),
  // withHooks({
  //   onInit(store) {
  //     console.log('AuthStore init', getState(store))
  //   },
  //   onDestroy(store) {
  //     console.log('AuthStore destroy', getState(store));
  //   },
  // }),
  // withCustomFeature('Auth')
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


