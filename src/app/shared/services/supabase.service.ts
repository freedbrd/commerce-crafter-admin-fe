import { Injectable } from '@angular/core';
import {
  AuthError,
  AuthResponse,
  AuthSession,
  PostgrestError,
  PostgrestSingleResponse,
  SupabaseClient,
  User,
  createClient,
  PostgrestResponse,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Observable, from, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabase: SupabaseClient;


  get supabaseAuth() {
    return this.supabase.auth;
  }

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  // select<T>(table: string, columns: string) {
  //   return from(
  //     this.supabase.from(table).select(columns)
  //   ).pipe(
  //     map((res: PostgrestResponse<T>) => {
  //       if(res.error) {
  //         throw res.error
  //       }
  //
  //       return res.data;
  //     })
  //   )
  // }
  //
  // insert<T>(table: string, data: T) {
  //   return from(
  //     this.supabase.from(table).insert<T>(data).single<T>()
  //   ).pipe(
  //     map((res: PostgrestSingleResponse<T>) => {
  //       if (res.error) {
  //         throw res.error;
  //       }
  //
  //       return res.data;
  //     })
  //   )
  // }
}
