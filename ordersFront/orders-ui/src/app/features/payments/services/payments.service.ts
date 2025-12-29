import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentsService {

  private readonly API = 'http://localhost:8080/payments';

  constructor(private http: HttpClient) {}

  pay(orderId: number, method: string): Observable<any> {
    return this.http.post(this.API, {
      orderId,
      method
    });
  }
}
