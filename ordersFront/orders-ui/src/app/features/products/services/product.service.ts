import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private readonly API_URL = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getProducts(filters?: {
    name?: string;
    category?: string;
    activeOnly?: boolean;
  }): Observable<Product[]> {

    let params = new HttpParams();

    if (filters?.name) {
      params = params.set('name', filters.name);
    }

    if (filters?.category) {
      params = params.set('category', filters.category);
    }

    if (filters?.activeOnly) {
      params = params.set('active', 'true');
    }

    return this.http.get<Product[]>(this.API_URL, { params });
  }
}
