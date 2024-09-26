import { ProfileComponent } from './core/auth/components/profile/profile.component';
import { Routes } from '@angular/router';
import { UnAuthGuard } from './core/auth/guards/unauth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';

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
    path: 'places',
    data: { title: 'Places' },
    loadComponent: () => import('./features/places/places.component').then(m => m.PlacesComponent)
  },
  {
    path: 'login',
    // Feature-level effects and features are registered here
    // providers: [
    //   provideState(authFeature),
    //   provideEffects(AuthEffects)
    // ],
    loadComponent: () => import('./core/auth/components/login/login.component').then(m => m.LoginComponent),
    canMatch: [UnAuthGuard],
  },
  {
    path: 'signup',
    loadComponent: () => import('./core/auth/components/signup/signup.component').then(m => m.SignupComponent),
    canMatch: [UnAuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('./core/auth/components/profile/profile.component').then(m => m.ProfileComponent),
    canMatch: [AuthGuard],
  },
  // not found
  {
    path: '**',
    redirectTo: 'tasks'
  }
];
