import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IBusinessProfileState, businessProfileAdapter } from './business-profile.state';

const { selectAll, selectEntities, selectIds, selectTotal } = businessProfileAdapter.getSelectors();

export const selectBusinessProfileState = createFeatureSelector<IBusinessProfileState>('businessProfile');

export const getAllBusinessProfiles = createSelector(
  selectBusinessProfileState,
  selectAll
);

export const getBusinessProfileEntities = createSelector(
  selectBusinessProfileState,
  selectEntities
);

export const getBusinessProfileIds = createSelector(
  selectBusinessProfileState,
  selectIds
);

export const getBusinessProfileTotal = createSelector(
  selectBusinessProfileState,
  selectTotal
);

export const businessProfileLoading = createSelector(
  selectBusinessProfileState,
  (state: IBusinessProfileState) => state.loading
);


