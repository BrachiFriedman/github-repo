import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search';

export const routes: Routes = [
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search').then(m => m.SearchComponent)
  },
  {
    path: 'bookmarks',
    loadComponent: () => import('../app/components/bookmarks').then(m => m.BookmarksComponent)
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  }
];