import { createReducer, on } from '@ngrx/store';
import {
  businessProfileAdapter,
  initialBusinessProfileState,
} from './business-profile.state';
import {
  createBusinessProfileFailure,
  createBusinessProfileRequest,
  createBusinessProfileSuccess, deleteBusinessProfileFailure,
  deleteBusinessProfileRequest, deleteBusinessProfileSuccess,
  getListFailure,
  getListRequest,
  getListSuccess,
} from './business-profile.actions';

export const businessProfileReducer = createReducer(
    initialBusinessProfileState,
    on(getListRequest, (state) => ({
      ...state,
      loading: true,
    })),
    on(getListSuccess, (state, {businessProfiles}) => (
        businessProfileAdapter.addMany(businessProfiles, {
          ...state,
          loading: false,
        })
    )),
    on(getListFailure, (state) => ({
      ...state,
      loading: false,
    })),

    on(createBusinessProfileRequest, (state) => ({
      ...state,
      loading: true,
      error: null,
      createSuccess: true,
    })),
    on(createBusinessProfileSuccess, (state, {businessProfile}) => (
        businessProfileAdapter.addOne(businessProfile, {
          ...state,
          loading: false,
          error: null,
          createSuccess: false,
        })
    )),
    on(createBusinessProfileFailure, (state, {error}) => ({
      ...state,
      loading: false,
      error,
    })),

    on(deleteBusinessProfileRequest, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(deleteBusinessProfileSuccess, (state, {businessProfileId}) => (
        businessProfileAdapter.removeOne(businessProfileId, {
          ...state,
          loading: false,
          error: null,
        })
    )),
    on(deleteBusinessProfileFailure, (state, {error}) => ({
      ...state,
      loading: false,
      error,
    })),
);
