import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../model/cart.item.model';
import { Product } from '../../products/model/product.model';
import { MessageService } from '../../../core/ui/message.service';
@Injectable({ providedIn: 'root' })
export class CartService {

    constructor(private messageService: MessageService) { }

    private itemsSubject = new BehaviorSubject<CartItem[]>([]);
    items$ = this.itemsSubject.asObservable();

    private get items(): CartItem[] {
        return this.itemsSubject.value;
    }

    add(product: Product): void {
        if (!product.id || 0) return;
        const items = [...this.items];
        const item = items.find(i => i.product.id === product.id);

        if (item) {
            item.quantity++;
        } else {
            items.push({ product, quantity: 1 });
        }

        this.itemsSubject.next(items);
    }

    remove(productId: number): void {
        if (!productId || 0) return;
        this.itemsSubject.next(
            this.items.filter(i => i.product.id !== productId)
        );
    }

    clear(): void {
        this.itemsSubject.next([]);
    }

    getTotal(): number {
        return this.items.reduce(
            (total, item) => total + item.product.priceCents * item.quantity,
            0
        );
    }

    increaseQuantity(productId: number): void {
        const items = [...this.itemsSubject.value];

        const item = items.find(i => i.product.id === productId);
        if (!item) return;

        if(item.product.stockQuantity === undefined){
            this.messageService.error('Quantidade de estoque não disponível.');
            return;
        } 

        if (item.quantity < item.product.stockQuantity) {
            item.quantity++;
            this.itemsSubject.next(items);
        }
    }

    decreaseQuantity(productId: number): void {
        const items = [...this.itemsSubject.value];

        const item = items.find(i => i.product.id === productId);
        if (!item) return;

        if (item.quantity > 1) {
            item.quantity--;
            this.itemsSubject.next(items);
        }
    }

}
