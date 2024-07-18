import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./auth.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(permission => AuthActions.loginSuccess({ permission })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
