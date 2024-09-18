import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '@app/core/auth/state/auth.store';
import { SnackbarService } from '@app/shared/services/snackbar.service';
import { tapResponse } from '@ngrx/operators';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackbarService);
  const authStore = inject(AuthStore);

  // Append new header (It needs to be added on "Access-Control-Allow-Headers")
  const request = req.clone({
    headers: req.headers.append('X-DEBUG', 'testing')
  });

  return next(request).pipe(
    catchError((e: HttpErrorResponse) => {
      const errorMessage = e.error?.message || `Something went wrong (${e.status})`;

      if (e.status === 401) authStore.logout(errorMessage); // Logout if it's unauthorized
      else snackbarService.open('error', e.statusText, errorMessage); // Open snackbar

      return throwError(() => e);
    })
  );
};
