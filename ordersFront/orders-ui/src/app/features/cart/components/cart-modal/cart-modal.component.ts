import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart.item.model';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../../orders/services/orders.service';
import { MessageService } from '../../../../core/ui/message.service';
import { CreateOrderDTO } from '../../../orders/model/orders.model';
import { Router } from '@angular/router';
@Component({
    standalone: true,
    selector: 'app-cart-modal',
    imports: [CommonModule],
    templateUrl: './cart-modal.component.html',
    styleUrls: ['./cart-modal.component.css']
})

export class CartModalComponent implements OnInit, OnDestroy {

    @Output() closed = new EventEmitter<void>();

    items: CartItem[] = [];
    total = 0;


    private sub?: Subscription;

    constructor(public cartService: CartService, private ordersService: OrdersService, private messageService: MessageService, private router: Router) { }

    ngOnInit(): void {
        this.sub = this.cartService.items$.subscribe(items => {
            this.items = items;
            this.total = this.cartService.getTotal();
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    close(): void {
        this.closed.emit();
    }

    increase(item: CartItem): void {
        if (item.product.id === undefined) return;

        this.cartService.increaseQuantity(item.product.id);
    }

    decrease(item: CartItem): void {
        if (item.product.id === undefined) return;
        this.cartService.decreaseQuantity(item.product.id);
    }


    checkout(): void {
        if (this.items.length === 0) {
            this.messageService.error('Carrinho vazio');
            return;
        }

        const payload: CreateOrderDTO = {
            customerId: 1, //mock temporario se der tempo para terminar o desafio, lembrar de fazer o login
            items: this.items.map(item => ({
                productId: item.product.id!,
                quantity: item.quantity
            }))
        };

        this.ordersService.create(payload).subscribe({
            next: res => {
                const order = res;
                this.cartService.clear();
                //this.router.navigate(['/payment', order.id]);
                this.messageService.success(
                    `Pedido #${res.id} criado com sucesso`
                );
                this.close();
            },
            error: err => {

                this.messageService.error(
                    err?.error?.message || 'Erro ao finalizar pedido'
                );
            }
        });
    }


}
