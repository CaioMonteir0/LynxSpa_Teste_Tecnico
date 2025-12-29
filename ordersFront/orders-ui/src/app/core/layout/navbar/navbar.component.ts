import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.services';
import { CartService } from '../../../features/cart/services/cart.service';
import { CartModalComponent } from '../../../features/cart/components/cart-modal/cart-modal.component';
import { PaymentModalComponent } from '../../../features/payments/components/payment-modal/payment-modal.component';
import { ProductRefreshService } from '../../../services/client/product-refresh.service';
@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, CartModalComponent, PaymentModalComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  itemsCount = 0;
  showCart = false;
  selectedOrderId: number | null = null

  constructor(public authService: AuthService, private cartService: CartService, 
    private productRefreshService: ProductRefreshService
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe(items => {
      this.itemsCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
  
  logout(): void {
    this.authService.logout();
  }

  openPayment(orderId: number) {
    this.selectedOrderId = orderId;
  }

  closePayment() {
    this.selectedOrderId = null;
    this.productRefreshService.refresh();
  }

}
