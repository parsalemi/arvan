import { Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: "full"
  },
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path:'list',
        loadComponent: () => import('./list/list.component').then(c => c.ListComponent)
      },
      {
        path:'add',
        loadComponent: () => import('./add-edit/add-edit.component').then(c => c.AddEditComponent)
      },
      {
        path:'edit',
        loadComponent: () => import('./add-edit/add-edit.component').then(c => c.AddEditComponent),
      },
      {
        path:'**',
        redirectTo: 'main',
      }
    ],

  },
];
