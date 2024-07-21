import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createBusinessProfileFailure,
  createBusinessProfileRequest,
  createBusinessProfileSuccess,
  getListFailure,
  getListRequest,
  getListSuccess,
} from './business-profile.actions';
import { catchError, map, switchMap, tap } from 'rxjs';
import {
  BusinessProfileService
} from '../../services/business-profile.service';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { IBusinessProfile } from '../../interfaces/business-profile.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class BusinessProfileEffects {
  getBusinessProfiles$ = createEffect(() => this.actions$.pipe(
    ofType(getListRequest),
    switchMap(() => {
      return this.businessProfileService.getBusinessProfileList().pipe(
        map((res: PostgrestSingleResponse<IBusinessProfile[]>) => {
          if(res.error) {
            return getListFailure({error: res.error})
          }

          return getListSuccess({
            businessProfiles: res.data
          })
        }),
      )
    }),
  ))

  createBusinessProfile$ = createEffect(() => this.actions$.pipe(
    ofType(createBusinessProfileRequest),
    switchMap(({businessProfile}) => {
      return this.businessProfileService.createBusinessProfile(businessProfile).pipe(
        map((res) => {
          if(res.error) {
            return createBusinessProfileFailure({
              error: res.error
            })
          }

          const [businessProfile] = res.data || [];

          this.nzNotificationService.success('Success', 'Business profile is created!')

          return createBusinessProfileSuccess({
            businessProfile
          })
        })
      )
    })
  ))

  createBusinessProfileFailure$ = createEffect(() => this.actions$.pipe(
    ofType(createBusinessProfileFailure),
    tap(({ error }) => {
      console.error('Error:', error);

      this.nzNotificationService.error('Error', error.message || 'Something went wrong')
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private businessProfileService: BusinessProfileService,
    private nzNotificationService: NzNotificationService
  ) {
  }
}
