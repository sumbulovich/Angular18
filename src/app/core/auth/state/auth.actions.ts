import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Permission } from '../models/authUser.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ email: string; password: string }>(),
    LoginSuccess: props<{ permission?: Permission }>(),
    LoginFailure: props<{ error: string }>(),
    Logout: emptyProps(),
    LogoutSuccess: emptyProps(),
    LogoutFailure: props<{ error: string }>(),
  },
});
