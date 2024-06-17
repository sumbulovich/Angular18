import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/users.component';

export const routes: Routes = [
  // { path: 'users', component: UsersComponent },
  {
    path: 'users',
    loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent)
  },
  // not found
	{
		path: '**',
		redirectTo: 'users'
	}
];
