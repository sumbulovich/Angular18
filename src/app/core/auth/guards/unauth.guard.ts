import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { AuthStore } from '../state/auth.store';


export const UnAuthGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  if (!authStore.isAuth()) return true;
  else return new RedirectCommand(router.parseUrl('/tasks'));
};
