import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../products/services/product.service';
import { Product } from '../../../products/model/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-catalog',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  products: Product[] = [];
  loading = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  getStockClass(stock: number): string {
  if (stock === 0) return 'bg-danger';
  if (stock <= 5) return 'bg-warning text-dark';
  return 'bg-primary';
}


  loadProducts() {
    this.loading = true;

    this.productsService.getProducts({
      activeOnly: true
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
