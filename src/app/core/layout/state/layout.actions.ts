import { createAction, props } from '@ngrx/store';

export const setDarkTheme = createAction('[Layout] setDarkTheme',  props<{ isDarkTheme: boolean }>());
