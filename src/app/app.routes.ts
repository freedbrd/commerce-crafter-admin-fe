import { Routes } from '@angular/router';
import { AUTH_LAYOUT_ROUTES } from './layouts/auth-layout/auth-layout.routes';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
    children: AUTH_LAYOUT_ROUTES
  }
];
