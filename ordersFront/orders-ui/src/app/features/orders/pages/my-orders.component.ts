import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { OrderSummary } from '../model/order-summary.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-my-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: OrderSummary[] = [];
  loading = false;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;

    this.ordersService.findAll().subscribe({
      next: data => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  formatBRL(cents: number): string {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
