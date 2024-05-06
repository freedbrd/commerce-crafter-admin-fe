import { Routes } from "@angular/router";

export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/auth/login-page/login-page.component').then(c => c.LoginPageComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('../../pages/auth/signup/signup.component').then(c => c.SignupComponent)
  },
]
