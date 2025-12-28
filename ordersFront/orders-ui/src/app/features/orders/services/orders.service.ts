import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateOrderItemDTO {
    productId: number;
    quantity: number;
}


export interface CreateOrderDTO {
    customerId: number;
    items: CreateOrderItemDTO[];
}

interface CreateOrderResponse {
    id: number;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {

    private readonly API_URL = 'http://localhost:8080/orders';

    constructor(private http: HttpClient) { }

    create(order: CreateOrderDTO) {
        return this.http.post<{ id: number }>(
            this.API_URL,
            order
        );
    }

}
