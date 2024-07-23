import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { layoutFeature } from './core/layout/state/layout.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './core/auth/state/auth.effects';
import { authFeature } from './core/auth/state/auth.reducer';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    // root-level effects and features are registered here
    provideStore(),
    provideState(layoutFeature),
    provideEffects(),
    provideHttpClient()
]
};
