import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderDTO, CreateOrderResponse } from '../model/orders.model';
import { OrderSummary } from '../model/order-summary.model';
import { OrderDetail } from '../model/order-detail.model';
@Injectable({ providedIn: 'root' })
export class OrdersService {

    private readonly API_URL = 'http://localhost:8080/orders';

    constructor(private http: HttpClient) { }

    create(order: CreateOrderDTO) {
        return this.http.post<CreateOrderResponse>(
            this.API_URL,
            order
        );
    }

    findAll(): Observable<OrderSummary[]> {
        return this.http.get<OrderSummary[]>(this.API_URL);
    }

    findById(orderId: number) {
        return this.http.get<OrderDetail>(`${this.API_URL}/${orderId}`);
    }

    cancel(orderId: number) {
        return this.http.post<void>(`${this.API_URL}/${orderId}/cancel`, {});
    }

}
