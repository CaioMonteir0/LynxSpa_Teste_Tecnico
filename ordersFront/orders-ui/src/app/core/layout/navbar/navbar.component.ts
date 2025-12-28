import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.services';
import { CartService } from '../../../features/cart/services/cart.service';
import { CartModalComponent } from '../../../features/cart/components/cart-modal/cart-modal.component';
@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, CartModalComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  itemsCount = 0;
  showCart = false;

  constructor(public authService: AuthService, private cartService: CartService) {}

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
}
