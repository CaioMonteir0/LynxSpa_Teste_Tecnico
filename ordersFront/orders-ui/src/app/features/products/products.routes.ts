import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products.component';
import { roleGuard } from '../../core/auth/guards/role.guard';
import { ProductFormComponent } from './components/new-products/product-form.component';
export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [roleGuard(['OPERATOR'])]
  },
  {
    path: 'new',
    component: ProductFormComponent,
    canActivate: [roleGuard(['OPERATOR'])]
  }
];
