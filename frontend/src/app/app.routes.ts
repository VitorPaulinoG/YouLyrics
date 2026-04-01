import { Routes } from '@angular/router';
import { canActivateAuthenticated } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [],
    loadComponent: () => import('./pages/feed/feed.component').then((m) => m.FeedComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
