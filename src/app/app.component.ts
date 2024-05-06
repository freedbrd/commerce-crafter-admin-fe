import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Session } from '@supabase/supabase-js';
import { Store } from '@ngrx/store';
import { sessionSelector } from './shared/ngrx/auth/auth.selectors';
import { SupabaseService } from './shared/services/supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  session$: Observable<Session>;

  constructor(private store: Store, private sp: SupabaseService) {
    this.session$ = store.select(sessionSelector)
  }
}
