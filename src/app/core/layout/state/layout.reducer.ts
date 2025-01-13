import { createFeature, createReducer, on } from "@ngrx/store";
import { setBreakpoint, setDarkTheme } from "./layout.actions";
import { Breakpoints } from "@angular/cdk/layout";

interface LayoutState {
  isDarkTheme: boolean;
  breakpoint: string;
}

const initialSate: LayoutState = {
  isDarkTheme: false,
  breakpoint: Breakpoints.Large
}

const reducer = createReducer(
  initialSate,
  on(setDarkTheme, (state, { isDarkTheme }) => ({ ...state, isDarkTheme })),
  on(setBreakpoint, (state, { breakpoint }) => ({ ...state, breakpoint })),
);

export const layoutFeature = createFeature({
  name: 'layoutFeature',
  reducer
});
