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
  filteredProducts: Product[] = [];
  loading = false;
  selectedProduct?: Product;
  showDeleteModal = false;
  selectedIndex?: number;


  filter = {
    search: '',
    category: '',
    onlyActive: false
  };

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;

    this.productsService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(this.filter.search.toLowerCase());

      const matchesCategory =
        !this.filter.category || product.category === this.filter.category;

      const matchesActive =
        !this.filter.onlyActive || product.active;

      return matchesSearch && matchesCategory && matchesActive;
    });
  }

  trackById(index: number, item: Product): number {
    return item.id!;
  }


  editProduct(index: number): void {
    this.selectedIndex = index;
    this.selectedProduct = { ...this.filteredProducts[index] };
  }


  confirmDelete(index: number): void {
    this.selectedIndex = index;
    this.selectedProduct = this.filteredProducts[index];
    this.showDeleteModal = true;
  }

  deleteProduct(): void {
    if (!this.selectedProduct?.id) return;

    this.productsService.delete(this.selectedProduct.id).subscribe({
      next: () => {
        this.products = this.products.filter(
          p => p.id !== this.selectedProduct!.id
        );

        this.applyFilters();
        this.showDeleteModal = false;
      },
      error: () => {
        this.showDeleteModal = false;
      }
    });
  }





}
