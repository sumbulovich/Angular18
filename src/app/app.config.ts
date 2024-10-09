import { APP_INITIALIZER, ApplicationConfig, inject, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { patchState } from '@ngrx/signals';
import { provideState, provideStore } from '@ngrx/store';
import { catchError, delay, Observable, of, tap, throwError } from 'rxjs';
import { routes } from './app.routes';
import { AuthService } from './core/auth/services/auth.service';
import { AuthStore } from './core/auth/state/auth.store';
import { authInterceptor } from './core/http/interceptors/auth.interceptor';
import { errorInterceptor } from './core/http/interceptors/error.interceptor';
import { layoutFeature } from './core/layout/state/layout.reducer';
import { AuthUser } from './core/auth/models/authUser.model';

export const appConfig: ApplicationConfig = {
  providers: [
    // Disable ngZone if using signals (remove zone.js from polyfills in main.ts file)
    // provideZoneChangeDetection({ eventCoalescing: true }),
    // provideClientHydration(),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor, authInterceptor])),

    // root-level effects and features are registered here
    provideStore(),
    provideState(layoutFeature),
    provideEffects(),

    // With SSR set will not work properly as it's pre-rendered
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AuthService],
      multi: true
    }
  ]
};

// Provide an initializer function that returns a Promise
function initializeAppFactory(authService: AuthService): () => Observable<AuthUser> {
  const authStore = inject(AuthStore);
  return () => {
    authStore.checkSession();
    if (!authStore.isAuth()) return of();
    return authService.loadProfile().pipe(
      tap((user) => authStore.setProfile(user)),
      catchError((error) => {
        authStore.logout();
        return throwError(() => new Error(error))
      })
    );
  }
}
