import { Routes } from '@angular/router';

export const routes: Routes = [
    {    
        path: '',    
        loadComponent: () => import('./pages/feed/feed.component').then(m => m.FeedComponent)  
    },
];
