import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./features/authentication/auth.route').then( r => r.routes)
  },
  {
    path:'',
    loadChildren: () => import('./features/dashboard/dashboard.route').then( r => r.routes)
  }
];
