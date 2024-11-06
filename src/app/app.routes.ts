import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { UnAuthGuard } from './core/auth/guards/unauth.guard';
import tasksManagementRoutes from './features/tasks-management/task-management.routes'
import DashboardRoutes from './features/dashboard/dashboard.routes'

export const routes: Routes = [
  {
    path: 'tasks',
    data: { title: 'Tasks management' },
    loadComponent: () => import('./features/tasks-management/tasks-management.component').then(m => m.TasksManagementComponent),
    title: 'Tasks management',
    children: tasksManagementRoutes
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
    children: DashboardRoutes
  },
  {
    path: 'places',
    data: { title: 'Places' },
    loadComponent: () => import('./features/places/places.component').then(m => m.PlacesComponent),
    title: 'Places'
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
  // not found
  // {
  //   path: '**',
  //   redirectTo: 'tasks'
  // }
];
