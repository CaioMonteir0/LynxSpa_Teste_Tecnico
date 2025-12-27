import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../services/product.service';
import { Product } from '../model/product.model';
import { ProductEditModalComponent } from './edit-products/product-edit-modal.component';
import { ProductDeleteModalComponent } from './delete-products/product-delete-modal.component';
@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, FormsModule,
    ProductEditModalComponent, ProductDeleteModalComponent]
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  selectedProduct?: Product;
  showDeleteModal = false;
  selectedIndex?: number;
  showEditModal = false;
  categories: string[] = [];


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
        this.categories = Array.from(new Set(this.products.map(p => p.category))).filter(c => c);
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


  openEdit(product: Product) {
    this.selectedProduct = product;
    this.showEditModal = true;
  }

  onProductUpdated(updated: Product) {
    const index = this.products.findIndex(p => p.id === updated.id);
    if (index !== -1) this.products[index] = updated;
    this.showEditModal = false;
    this.applyFilters();
  }

  confirmDelete(index: number): void {
    this.selectedIndex = index;
    this.selectedProduct = this.filteredProducts[index];
    this.showDeleteModal = true;
  }

  openDeleteModal(product: Product) {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  onProductDeleted(productId: number) {
    this.products = this.products.filter(p => p.id !== productId);
    this.applyFilters();
  }






}
