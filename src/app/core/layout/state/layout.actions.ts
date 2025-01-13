import { createAction, props } from '@ngrx/store';

export const setDarkTheme = createAction('[Layout] setDarkTheme',  props<{ isDarkTheme: boolean }>());
export const setBreakpoint = createAction('[Layout] setBreakpoint',  props<{ breakpoint: string }>());
