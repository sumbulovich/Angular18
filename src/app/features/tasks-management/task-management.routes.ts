import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, Routes } from '@angular/router';
import { DUMMY_USERS } from './constants/dummy-users';
import { User } from './models/user.model';

const resolveUser: ResolveFn<User | undefined> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  // You can inject services to get the data
  return DUMMY_USERS.find((user) => user._id === activatedRoute.paramMap.get('userId'))
}

const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  // You can inject services to get the data
  const user = resolveUser(activatedRoute, routerState) as User | undefined;
  return user ? `Task Manager - ${user.name}'s Tasks` : 'Task Manager - Not found'
}

const routes: Routes = [{
  path: '',
  redirectTo: DUMMY_USERS[0]._id,
  pathMatch: 'full'
},
{
  path: ':userId',
  loadComponent: () => import('./components/tasks/tasks.component').then(m => m.TasksComponent),
  resolve: {
    user: resolveUser
  },
  title: resolveTitle,
  // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  children: [
    {
      path: 'not-found',
      loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
    }
  ]
}]

export default routes;
