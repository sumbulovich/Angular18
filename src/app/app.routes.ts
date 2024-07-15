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
    path: 'system',
    data: { title: 'System' },
    loadComponent: () => import('./features/system/system.component').then(m => m.SystemComponent)
  },
  // not found
	{
		path: '**',
		redirectTo: 'tasks'
	}
];
