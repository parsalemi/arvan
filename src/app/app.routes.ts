import { Routes } from '@angular/router';
import { checkAuthenticationGuard } from "./core/guards/check-authentication.guard";
import { loginSingoutGuard } from "./core/guards/login-singout.guard";

export const routes: Routes = [
  {
    path:'auth',
    canActivate:[loginSingoutGuard],
    loadChildren: () => import('./features/authentication/auth.route').then( r => r.routes)
  },
  {
    path:'',
    canActivate: [checkAuthenticationGuard],
    loadChildren: () => import('./features/dashboard/dashboard.route').then( r => r.routes)
  }
];
