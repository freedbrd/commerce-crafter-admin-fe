import { Injectable } from '@angular/core';
import { AuthError, AuthResponse, AuthSession, PostgrestError, PostgrestSingleResponse, SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Observable, from, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;


  get supabaseAuth() {
    return this.supabase.auth;
  }

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  insert<T>(table: string, data: T) {
    return from(
      this.supabase.from(table).insert<T>(data).single<T>()
    ).pipe(
      map((res: PostgrestSingleResponse<T>) => {
        if (res.error) {
          throw res.error;
        }

        return res.data;
      })
    )
  }
}
