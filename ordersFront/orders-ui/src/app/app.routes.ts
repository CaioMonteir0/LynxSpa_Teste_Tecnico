import { Routes } from '@angular/router';
import { authGuard } from '../app/core/auth/guards/auth.guard';
import { roleGuard } from '../app/core/auth/guards/role.guard';

export const routes: Routes = [

  {
    path: 'login',
    loadChildren: () =>
      import('../app/core/auth/auth.routes')
        .then(m => m.authRoutes)
  },

  {
    path: 'products',
    canActivate: [authGuard, roleGuard(['OPERATOR'])],
    loadChildren: () =>
      import('./features/products/products.routes')
        .then(m => m.routes)
  },

  {
    path: 'orders',
    canActivate: [authGuard, roleGuard(['CLIENT'])],
    loadChildren: () =>
      import('./features/orders/orders.routes')
        .then(m => m.routes)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
