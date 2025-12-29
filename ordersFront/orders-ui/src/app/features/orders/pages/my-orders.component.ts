import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { OrderSummary } from '../model/order-summary.model';
import { FormsModule } from '@angular/forms';
import { PaymentModalComponent } from '../../payments/components/payment-modal/payment-modal.component';
@Component({
    standalone: true,
    selector: 'app-my-orders',
    imports: [CommonModule, FormsModule, PaymentModalComponent],
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

    orders: OrderSummary[] = [];
    loading = false;
    selectedOrderId?: number | null = null;

    constructor(private ordersService: OrdersService) { }

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

    openDetails(orderId: number): void {
        console.log('Id do pedido:', orderId);
        console.log("antes:",this.selectedOrderId);
        this.selectedOrderId = orderId;
        console.log("depois:",this.selectedOrderId);

    }

    closeModal() {
        this.selectedOrderId = null;
        this.loadOrders();
    }
}
