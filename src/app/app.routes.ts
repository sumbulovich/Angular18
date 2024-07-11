import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: 'users', component: UsersComponent },
  {
    path: 'tasks',
    data: { title: 'Users tasks' },
    loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent)
  },
  // not found
	{
		path: '**',
		redirectTo: 'tasks'
	}
];
