import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: 'users', component: UsersComponent },
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
  // not found
	{
		path: '**',
		redirectTo: 'tasks'
	}
];
