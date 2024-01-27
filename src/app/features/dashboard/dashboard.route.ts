import { Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path:'main',
        loadComponent: () => import('./list/list.component').then(c => c.ListComponent)
      },
      {
        path:'add',
        loadComponent: () => import('./add/add.component').then(c => c.AddComponent)
      },
      {
        path:'**',
        redirectTo: 'main',
      }
    ],
  }
];
