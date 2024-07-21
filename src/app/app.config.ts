import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './shared/ngrx/auth/auth.effects';
import { authReducer } from './shared/ngrx/auth/auth.reducer';
import {
  BusinessProfileEffects
} from './shared/ngrx/business-profiles/business-profile.effects';
import {
  businessProfileReducer
} from './shared/ngrx/business-profiles/business-profile.reducer';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(),
    provideState({
      name: 'auth',
      reducer: authReducer
    }),
    provideState({
      name: 'businessProfile',
      reducer: businessProfileReducer
    }),
    provideEffects([AuthEffects, BusinessProfileEffects])
  ]
};
