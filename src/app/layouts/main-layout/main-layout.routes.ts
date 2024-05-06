import { Routes } from "@angular/router";

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/main/business-profiles/business-profiles.component').then(c => c.BusinessProfilesComponent)
  },
]
