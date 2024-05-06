import { AuthError } from '@supabase/supabase-js';
import { SupabaseService } from './../../services/supabase.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginRequest,
  setSession,
  signupRequest,
  signupSuccess,
} from './auth.actions';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() => this.actions$.pipe(
    ofType(signupRequest),
    switchMap(({email, password, name}) => {
      return this.authService.signup(email, password).pipe(
        map(user => signupSuccess({
          user,
          name,
        })),
        catchError((err: AuthError) => {
          console.log(err.message);
          return throwError(() => err);
        }),
      );
    }),
  ));

  signupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(signupSuccess),
    switchMap(({user, name}) => {
      return this.supabaseService.insert('profiles', {
        name,
        user_id: user.id,
        email: user.email,
      });
    }),
    tap(() => {
      this.router.navigate(['/auth']);
    }),
    catchError((err) => {
      console.log(err?.message);
      return throwError(() => err);
    }),
  ), {dispatch: false});

  loginRequest$ = createEffect(() => this.actions$.pipe(
    ofType(loginRequest),
    switchMap(({password, email}) => {
      return this.authService.login(email, password).pipe(
        map((res) => {
          this.router.navigate(['/'])
          return setSession({session: res.session})
        }),
        catchError((err: AuthError) => {
          console.log(err.message);
          return throwError(() => err);
        }),
      );
    }),
  ));

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
  ) {
  }
}
