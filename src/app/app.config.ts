import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { layoutFeature } from './core/layout/state/layout.reducer';
import { errorInterceptor } from './core/http/interceptors/error.interceptor';
import { authInterceptor } from './core/http/interceptors/auth.interceptor';

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
  ]
};
