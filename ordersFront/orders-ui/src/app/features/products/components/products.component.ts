import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  loading = false;

  search = '';
  category = '';
  activeOnly = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;

    this.productsService.getProducts({
      name: this.search,
      category: this.category,
      activeOnly: this.activeOnly
    }).subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
