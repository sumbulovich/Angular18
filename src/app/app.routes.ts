import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { UnAuthGuard } from './core/auth/guards/unauth.guard';
import { TicketsStore } from './features/dashboard/state/tickets.store';
import { PlacesStore } from './features/places/state/places.store';
import { UserPlacesStore } from './features/places/state/userPlaces.store';
import { TicketsService } from './features/dashboard/services/tickets.service';
import { PlacesService } from './features/places/services/places.service';
import { TasksService } from './features/tasks-management/services/tasks.service';

export const routes: Routes = [
  {
    path: 'tasks',
    data: { title: 'Tasks management' },
    loadComponent: () => import('./features/tasks-management/tasks-management.component').then(m => m.TasksManagementComponent),
    title: 'Tasks management',
    loadChildren: () => import('./features/tasks-management/task-management.routes'),
    providers: [TasksService]
  },
  {
    path: 'investment',
    data: { title: 'Investment calculator' },
    loadComponent: () => import('./features/investment/investment.component').then(m => m.InvestmentComponent),
    title: 'Investment calculator'
  },
  {
    path: 'dashboard',
    data: { title: 'Dashboard' },
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes'),
    providers: [TicketsStore, TicketsService]
  },
  {
    path: 'places',
    data: { title: 'Places' },
    loadComponent: () => import('./features/places/places.component').then(m => m.PlacesComponent),
    title: 'Places',
    providers: [PlacesStore, UserPlacesStore, PlacesService]
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
    title: 'Login'
  },
  {
    path: 'signup',
    loadComponent: () => import('./core/auth/components/signup/signup.component').then(m => m.SignupComponent),
    canMatch: [UnAuthGuard],
    title: 'Signup'
  },
  {
    path: 'profile',
    loadComponent: () => import('./core/auth/components/profile/profile.component').then(m => m.ProfileComponent),
    canMatch: [AuthGuard],
    title: 'Profile'
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  // not found
  {
    path: '**',
    redirectTo: 'tasks'
  }
];
