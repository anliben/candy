import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/pages/home/home.module').then(m => m.HomeModule)
  }
];
