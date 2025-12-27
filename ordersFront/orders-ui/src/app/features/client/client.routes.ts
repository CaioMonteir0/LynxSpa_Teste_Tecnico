import { Routes } from '@angular/router';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { authGuard } from '../../core/auth/guards/auth.guard';
import { roleGuard } from '../../core/auth/guards/role.guard';

export const clientRoutes: Routes = [
  {
    path: '',
    component: ProductCatalogComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'CLIENT' }
  }
];
