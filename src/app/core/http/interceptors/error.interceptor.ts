import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackbarService } from '@app/shared/services/snackbar.service';
import { tapResponse } from '@ngrx/operators';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackbarService);

  // Append new header (It needs to be added on "Access-Control-Allow-Headers")
  const request = req.clone({
    headers: req.headers.append('X-DEBUG', 'testing')
  });

  return next(request).pipe(
    catchError((e: HttpErrorResponse) => {
      const error = new Error(`Something went wrong (${e.status})`);
      snackbarService.open('error', e.statusText, error?.message)
      return throwError(() => error);
    })
  );
};
