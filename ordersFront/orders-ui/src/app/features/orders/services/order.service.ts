import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id: number;
  status: string;
  createdAt: string;
  totalCents: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  list(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API}/${id}`);
  }
}
