import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable } from 'rxjs';
import { IBusinessProfile } from '../interfaces/business-profile.interface';
import { PostgrestResponse } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class BusinessProfileService {
  constructor(
    private supabaseService: SupabaseService
  ) {
  }

  getBusinessProfileList() {
    return from(
      this.supabaseService.supabase.from('business_profiles').select('*')
    )
  }

  createBusinessProfile(businessProfile: IBusinessProfile): Observable<PostgrestResponse<IBusinessProfile>> {
    return from(
      this.supabaseService.supabase.from('business_profiles').insert(businessProfile).select('*')
    )
  }
}
