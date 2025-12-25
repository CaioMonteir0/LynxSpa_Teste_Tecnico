import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadChildren: () =>
      import('../app/core/auth/auth.routes')
        .then(m => m.authRoutes)
  },

  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes')
        .then(m => m.routes)
  },

  {
    path: 'orders',
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
