import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'login',
    loadComponent:() => import('../authentication/login/login.component').then(c => c.LoginComponent)
  },
  {
    path:'register',
    loadComponent:() => import('../authentication/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path:'',
    pathMatch:"full",
    redirectTo:'login'
  },
  {
    path:'**',
    redirectTo:'login'
  },
];
