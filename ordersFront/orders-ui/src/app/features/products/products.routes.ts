import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products.component';
import { roleGuard } from '../../core/auth/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [roleGuard(['OPERATOR'])]
  }
];
