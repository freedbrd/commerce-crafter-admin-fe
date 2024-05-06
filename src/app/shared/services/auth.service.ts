import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import {
  AuthResponse,
  AuthSession,
  Subscription,
  User,
} from '@supabase/supabase-js';
import { from, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setSession } from '../ngrx/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subscription!: Subscription;
  private _session: AuthSession | null = null;

  get session() {
    this.supabaseService.supabaseAuth.getSession().then(({data}) => {
      this._session = data.session;
    });
    return this._session;
  }

  constructor(
    private supabaseService: SupabaseService,
    private store: Store,
  ) {
    this.onAuthStateChange((event: string, session: AuthSession) => {
      if (event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') {
        this.store.dispatch(setSession({
          session,
        }));
      }

      if (event === 'SIGNED_OUT') {
        this.store.dispatch(setSession({
          session: null,
        }));
      }
    });
  }

  onAuthStateChange(callback: any) {
    const {data} = this.supabaseService.supabaseAuth.onAuthStateChange(
      callback) || {};

    this.subscription = data?.subscription;
  }

  unsubscribeAuthChanges() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login(email: string, password: string) {
    return from(
      this.supabaseService.supabaseAuth.signInWithPassword({
        email,
        password,
      }),
    ).pipe(
      map(res => {
        if (res?.error) {
          throw res?.error;
        }

        return res.data;
      }),
    );
  }

  signup(email: string, password: string): Observable<User> {
    return from(
      this.supabaseService.supabaseAuth.signUp({
        email,
        password,
      }),
    ).pipe(
      map((res: AuthResponse) => {
        if (res?.error) {
          throw res.error;
        }

        return res.data.user as User;
      }),
    );
  }
}
