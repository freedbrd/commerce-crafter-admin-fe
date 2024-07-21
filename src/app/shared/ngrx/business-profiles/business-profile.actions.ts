import { createAction, props } from '@ngrx/store';
import { IBusinessProfile } from '../../interfaces/business-profile.interface';
import { PostgrestError } from '@supabase/supabase-js';

export enum BusinessProfileActionType {
  GET_LIST_REQUEST = '[Business Profile] Get list request',
  GET_LIST_SUCCESS = '[Business Profile] Get list success',
  GET_LIST_FAILURE = '[Business Profile] Get list failure',

  CREATE_PROFILE_REQUEST = '[Business Profile] Create profile request',
  CREATE_PROFILE_SUCCESS = '[Business Profile] Create profile success',
  CREATE_PROFILE_FAILURE = '[Business Profile] Create profile failure',
}

export const getListRequest = createAction(
  BusinessProfileActionType.GET_LIST_REQUEST
)

export const getListSuccess = createAction(
  BusinessProfileActionType.GET_LIST_SUCCESS,
  props<{
    businessProfiles: IBusinessProfile[]
  }>()
)

export const getListFailure = createAction(
  BusinessProfileActionType.GET_LIST_FAILURE,

  props<{
    error: PostgrestError
  }>()
)

export const createBusinessProfileRequest = createAction(
  BusinessProfileActionType.CREATE_PROFILE_REQUEST,

  props<{
    businessProfile: IBusinessProfile
  }>()
)

export const createBusinessProfileSuccess = createAction(
  BusinessProfileActionType.CREATE_PROFILE_SUCCESS,

  props<{
    businessProfile: IBusinessProfile
  }>()
)

export const createBusinessProfileFailure = createAction(
  BusinessProfileActionType.CREATE_PROFILE_FAILURE,

  props<{
    error: PostgrestError
  }>()
)
