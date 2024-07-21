import { IBusinessProfile } from '../../interfaces/business-profile.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface IBusinessProfileState extends EntityState<IBusinessProfile> {
  loading: boolean;
  createSuccess: boolean;
}

export const businessProfileAdapter: EntityAdapter<IBusinessProfile> = createEntityAdapter<IBusinessProfile>();

export const initialBusinessProfileState: IBusinessProfileState = businessProfileAdapter.getInitialState(
  {
    loading: true,
    createSuccess: false
  });
