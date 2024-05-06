import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { from, map } from 'rxjs';
import { SupabaseService } from '../services/supabase.service';

export const authGuard = (): CanActivateFn => {
  return () => {
    const supabaseService = inject(SupabaseService);
    const router: Router = inject(Router);

    return from(supabaseService.supabaseAuth.getSession()).pipe(
      map(res => {
        return res.data?.session?.access_token ? true : router.createUrlTree(['/auth']);
      })
    );
  };
};
