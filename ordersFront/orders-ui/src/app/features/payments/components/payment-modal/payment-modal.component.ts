import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../../orders/services/orders.service';
import { OrderDetail } from '../../../orders/model/order-detail.model';
import { PaymentsService } from '../../services/payments.service';
import { MessageService } from '../../../../core/ui/message.service';
@Component({
    standalone: true,
    selector: 'app-payment-modal',
    imports: [CommonModule, FormsModule],
    templateUrl: './payment-modal.component.html',
    styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnChanges {

    @Input() orderId!: number;
    @Output() closed = new EventEmitter<void>();
    @Output() paid = new EventEmitter<void>();

    order?: OrderDetail;
    selectedMethod = 'PIX';
    loading = false;

    constructor(private ordersService: OrdersService, private paymentsService: PaymentsService, private messageService: MessageService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['orderId'] && this.orderId) {

            this.loadOrder();
        }
    }

    loadOrder(): void {
        this.ordersService.findById(this.orderId).subscribe({
            next: data => this.order = data
        });
    }

    pay(): void {
        if (!this.order) return;

        this.loading = true;

        this.paymentsService
            .pay(this.order.id, this.selectedMethod)
            .subscribe({
                next: () => {
                    this.loading = false;
                    this.paid.emit();
                    this.close();
                    this.messageService.success('Pedido pago com sucesso!' );
                },
                error: () => {
                    this.loading = false;
                    this.messageService.error('Erro ao pagar pedido');
                }
            });
    }

    cancelOrder() {
        this.ordersService.cancel(this.orderId).subscribe(() => {
            this.close();
        });
    }

    close() {
        this.closed.emit();
    }
}
