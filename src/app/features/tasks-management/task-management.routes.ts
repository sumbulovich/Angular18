import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { DUMMY_USERS } from './constants/dummy-users';
import { User } from './models/user.model';
import { inject } from '@angular/core';

const resolveUser: ResolveFn<User | undefined> = (
  activatedRoute: ActivatedRouteSnapshot,
) => {
  const router = inject(Router);
  // You can inject services to get the data
  const userId = activatedRoute.paramMap.get('userId');
  if (!userId) return;
  const user = DUMMY_USERS.find((user) => user._id === userId);
  if (!user) {
    router.navigate(['tasks', 'not-found'], { queryParams: { userId } });
    return;
  }
  return user;
};

const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  // You can inject services to get the data
  const user = resolveUser(activatedRoute, routerState) as User | undefined;
  if (!user) return 'Task Manager - Not found';
  return `Task Manager - ${user.name}'s Tasks`;
};

const routes: Routes = [
  {
    path: '',
    redirectTo: `user/${DUMMY_USERS[0]._id}`,
    pathMatch: 'full',
  },
  {
    path: 'user/:userId',
    loadComponent: () =>
      import('./pages/tasks/tasks.component').then((m) => m.TasksComponent),
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { user: resolveUser },
    title: resolveTitle,
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
    title: resolveTitle,
  },
];

export default routes;
