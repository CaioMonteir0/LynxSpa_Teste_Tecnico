import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../products/services/product.service';
import { Product } from '../../../products/model/product.model';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../cart/services/cart.service';
import { RouterModule } from "@angular/router";
import { ProductRefreshService } from '../../../../services/client/product-refresh.service';
@Component({
  standalone: true,
  selector: 'app-product-catalog',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  products: Product[] = [];
  loading = false;
  filteredProducts: Product[] = [];
  categories: string[] = [];

  filter = {
    search: '',
    category: '',
    onlyActive: false
  };


  constructor(private productsService: ProductsService,
    public cartService: CartService, private productRefreshService: ProductRefreshService) { }

  ngOnInit(): void {
    this.loadProducts();

    this.productRefreshService.refresh$.subscribe(() => {
      this.loadProducts()
    });

    this.applyFilters();
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
        this.filteredProducts = data;

        this.categories = Array.from(
          new Set(data.map(p => p.category).filter(Boolean))
        );
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
  this.filteredProducts = this.products.filter(p => {
    const matchesSearch =
      !this.filter.search ||
      p.name.toLowerCase().includes(this.filter.search.toLowerCase());

    const matchesCategory =
      !this.filter.category || p.category === this.filter.category;

    const matchesActive =
        !this.filter.onlyActive || p.active;

    return matchesSearch && matchesCategory && matchesActive;
  });
}

}
