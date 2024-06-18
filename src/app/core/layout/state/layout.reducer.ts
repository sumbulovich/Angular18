import { createFeature, createReducer, on } from "@ngrx/store";
import { setDarkTheme } from "./layout.actions";

interface LayoutState {
  isDarkTheme: boolean;
}

const initialSate: LayoutState = {
  isDarkTheme: false
}

const reducer = createReducer(
  initialSate,
  on(setDarkTheme, (state, { isDarkTheme }) => ({ ...state, isDarkTheme })),
);

export const layoutFeature = createFeature({
  name: 'layoutFeature',
  reducer
});
