import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const sessionSelector = createSelector(
  selectAuthState,
  (state) => state.session
)

export const profileSelector = createSelector(
  selectAuthState,
  state => state.profile
)

export const authLoadingSelector = createSelector(
  selectAuthState,
  state => state.loading
)
