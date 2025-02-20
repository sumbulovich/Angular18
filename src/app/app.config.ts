import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { routes } from './app.routes';
import { AuthUser } from './core/auth/models/authUser.model';
import { AuthService } from './core/auth/services/auth.service';
import { AuthStore } from './core/auth/state/auth.store';
import { authInterceptor } from './core/http/interceptors/auth.interceptor';
import { errorInterceptor } from './core/http/interceptors/error.interceptor';
import { layoutFeature } from './core/layout/state/layout.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    // Disable ngZone if using signals (remove zone.js from polyfills in main.ts file)
    // provideZoneChangeDetection({ eventCoalescing: true }),
    // provideClientHydration(),
    provideExperimentalZonelessChangeDetection(),

    // Enabling routes and give access to route params with Input Binding (also to children routes)
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),

    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor, authInterceptor]),
    ),

    // root-level effects and features are registered here
    provideStore(),
    provideState(layoutFeature),
    provideEffects(),

    // With SSR set will not work properly as it's pre-rendered
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AuthService],
      multi: true,
    },
  ],
};

// Provide an initializer function that returns a Promise
function initializeAppFactory(
  authService: AuthService,
): () => Observable<AuthUser> {
  const authStore = inject(AuthStore);
  return () => {
    authStore.checkSession();
    if (!authStore.isAuth()) return of();
    return authService.loadProfile().pipe(
      tap((user) => authStore.setProfile(user)),
      catchError((error) => {
        authStore.logout();
        return throwError(() => new Error(error));
      }),
    );
  };
}
