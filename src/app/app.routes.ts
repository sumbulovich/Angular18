import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { authFeature } from './core/auth/state/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './core/auth/state/auth.effects';

export const routes: Routes = [
  {
    path: 'tasks',
    data: { title: 'Users tasks' },
    loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'investment',
    data: { title: 'Investment calculator' },
    loadComponent: () => import('./features/investment/investment.component').then(m => m.InvestmentComponent)
  },
  {
    path: 'dashboard',
    data: { title: 'Dashboard' },
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'login',
    // Feature-level effects and features are registered here
    // providers: [
    //   provideState(authFeature),
    //   provideEffects(AuthEffects)
    // ],
    loadComponent: () => import('./core/auth/auth.component').then(m => m.AuthComponent)
  },
  // not found
  {
    path: '**',
    redirectTo: 'tasks'
  }
];
