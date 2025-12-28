import { Routes } from '@angular/router';
import { MyOrdersComponent } from './pages/my-orders.component';
import { authGuard } from '../../core/auth/guards/auth.guard';
import { roleGuard } from '../../core/auth/guards/role.guard';
export const ordersRoutes: Routes = [
  {
    path: '',
    component: MyOrdersComponent,
    canActivate: [authGuard, roleGuard(['CLIENT'])],
  }
];
