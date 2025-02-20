import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Permission } from '../models/authUser.model';
import { AuthActions } from './auth.actions';

interface AuthState {
  permission: Permission;
  inProgress: boolean;
  error: string | undefined;
}

const initialSate: AuthState = {
  permission: 'guest',
  inProgress: false,
  error: undefined,
};

const reducer = createReducer(
  initialSate,
  on(AuthActions.login, (state) => ({
    ...state,
    inProgress: true,
    error: undefined,
  })),
  on(AuthActions.loginSuccess, (state, { permission }) => ({
    ...state,
    inProgress: false,
    permission,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    inProgress: false,
    error,
  })),
);

export const authFeature = createFeature({
  name: 'authFeature',
  reducer,
  extraSelectors: (store) => {
    const selectIsAuth = createSelector(
      store.selectPermission,
      (permission) => permission !== 'guest',
    );
    return { selectIsAuth };
  },
});
