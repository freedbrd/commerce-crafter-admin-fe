import { createAction, props } from '@ngrx/store';
import { Session, User } from '@supabase/supabase-js';
import { IProfile } from '../../interfaces/profile.interface';

export enum AuthActionTypes {
  SIGNUP_REQUEST = '[Auth] Signup request',
  SIGNUP_SUCCESS = '[Auth] Signup success',
  SIGNUP_FAILURE = '[Auth] Signup failure',

  LOGIN_REQUEST = '[Auth] Login Request',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',

  SET_SESSION = '[Auth] Set Session',
  GET_SESSION = '[Auth] Get Session',
}

export const setSession = createAction(
  AuthActionTypes.SET_SESSION,
  props<{
    session: Session
  }>()
);

export const getSession = createAction(
  AuthActionTypes.GET_SESSION
)

export const loginRequest = createAction(
  AuthActionTypes.LOGIN_REQUEST,
  props<{
    email: string,
    password: string,
  }>(),
);

export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
);

export const loginFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
);

export const signupRequest = createAction(
  AuthActionTypes.SIGNUP_REQUEST,
  props<{
    email: string,
    password: string,
    name: string,
  }>(),
);
export const signupSuccess = createAction(
  AuthActionTypes.SIGNUP_SUCCESS,
  props<{
    user: User,
    name: string
  }>(),
);
export const signupFailure = createAction(
  AuthActionTypes.SIGNUP_FAILURE,
);
