import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../../auth/state/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const token = authStore.user()?.token;
  if (token)
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  return next(req);
};
