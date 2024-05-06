import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import {
  loginFailure,
  loginRequest, loginSuccess, setSession,
  signupFailure,
  signupRequest,
  signupSuccess,
} from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(signupRequest, (state) => ({
    ...state,
    loading: true
  })),
  on(signupFailure, (state) => ({
    ...state,
    loading: false
  })),
  on(signupSuccess, (state) => ({
    ...state,
    loading: false
  })),

  on(loginRequest, (state) => ({
    ...state,
    loading: true
  })),
  on(loginSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(loginFailure, (state) => ({
    ...state,
    loading: false
  })),

  on(setSession, (state, {session}) => ({
    ...state,
    session
  }))
)
