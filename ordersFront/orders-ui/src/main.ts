import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ProductsComponent } from './app/features/products/components/products.component';
import { OrdersComponent } from './app/features/orders/components/orders.component';
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      
    ])
  ]
});
