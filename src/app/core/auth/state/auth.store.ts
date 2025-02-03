import { computed, effect, inject } from "@angular/core";
import { Router } from "@angular/router";
import { tapResponse } from "@ngrx/operators";
import { getState, patchState, signalState, signalStore, signalStoreFeature, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { CookieService } from 'ngx-cookie-service';
import { pipe, switchMap, tap } from "rxjs";
import { AuthUser } from "../models/authUser.model";
import { AuthService } from "../services/auth.service";


interface AuthState {
  user: Partial<AuthUser> | undefined,
  inProgress: boolean;
  isLoading: boolean;
  error: string | undefined;
}

const initialSate = signalState<AuthState>({
  user: undefined,
  inProgress: false,
  isLoading: false,
  error: undefined
})

export const AuthStore = signalStore(
  // Providing store at the root level.
  { providedIn: 'root' },
  withState(initialSate),
  withComputed((authState) => ({
    isAuth: computed(() => !!authState.user()),
  })),
  withMethods((authState, authService = inject(AuthService), cookieService = inject(CookieService), router = inject(Router)) => ({
    login: rxMethod<{ email: string, password: string }>(
      pipe(
        tap(() => patchState(authState, { inProgress: true, error: undefined })),
        switchMap(({ email, password }) => {
          return authService.login(email, password).pipe(
            tapResponse({
              next: (user: AuthUser) => {
                patchState(authState, { user });
                const expirationDate = new Date(new Date().getTime() + user.expiration!);
                cookieService.set('token', user.token!, expirationDate);
              },
              error: (error: string) => patchState(authState, { inProgress: false, error }),
              finalize: () => patchState(authState, { inProgress: false }),
            })
          );
        })
      )
    ),
    signup: rxMethod<Partial<AuthUser>>(
      pipe(
        tap(() => patchState(authState, { inProgress: true, error: undefined })),
        switchMap((user: Partial<AuthUser>) => {
          return authService.signup(user).pipe(
            tapResponse({
              next: () => router.navigate([], { queryParams: { success: user.email } }),
              error: (error: string) => patchState(authState, { inProgress: false, error }),
              finalize: () => patchState(authState, { inProgress: false }),
            })
          );
        })
      )
    ),
    updateProfile: rxMethod<{ name: string, lastName: string }>(
      pipe(
        tap(() => patchState(authState, { inProgress: true, error: undefined })),
        switchMap(({ name, lastName }) => {
          return authService.updateProfile(name, lastName).pipe(
            tapResponse({
              next: () => patchState(authState, (state) => ({ user: { ...state.user!, name, lastName } })),
              error: (error: string) => patchState(authState, { inProgress: false, error }),
              finalize: () => patchState(authState, { inProgress: false }),
            })
          );
        })
      )
    ),
    logout(error?: string): void {
      patchState(authState, { user: undefined });
      router.navigate(['login'], { queryParams: { error } });
      cookieService.delete('token');
    },
    checkSession(): void {
      const token = cookieService.get('token');
      if (token) patchState(authState, { user: { token } }); // Save token for AuthInterceptor
    },
    setProfile(user: AuthUser): void {
      patchState(authState, { user: { ...authState.user(), ...user} }); // Save token for AuthInterceptor
    }
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


