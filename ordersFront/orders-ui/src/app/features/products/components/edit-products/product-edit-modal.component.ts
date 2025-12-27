import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../model/product.model';
import { ProductsService } from '../../services/product.service';
import { MessageService } from '../../../../core/ui/message.service';
@Component({
  standalone: true,
  selector: 'app-product-edit-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit-modal.component.html'
})
export class ProductEditModalComponent implements OnChanges {

  @Input() show = false;
  @Input() product?: Product;

  @Output() updated = new EventEmitter<Product>();
  @Output() closed = new EventEmitter<void>();

  form!: Product;
  priceFormatted = '';
  priceInvalid = false;
  imageInvalid = false;
  loading = false;

  constructor(private productsService: ProductsService, private messageService: MessageService) {}

  ngOnChanges(): void {
    if (this.product) {
      this.form = { ...this.product };
      this.priceFormatted = this.formatToBRL(this.form.priceCents);
    }
  }

  onPriceInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    this.form.priceCents = digits ? Number(digits) : 0;
    this.priceFormatted = this.formatToBRL(this.form.priceCents);
    this.priceInvalid = this.form.priceCents <= 0;
  }

  onImageUrlChange() {
    if (!this.form.imageUrl) return;

    const img = new Image();
    img.onload = () => this.imageInvalid = false;
    img.onerror = () => this.imageInvalid = true;
    img.src = this.form.imageUrl;
  }

  save() {
    if (this.priceInvalid || this.imageInvalid) return;

    this.loading = true;

    this.productsService.update(this.form).subscribe({
      next: updated => {
        this.loading = false;
        this.updated.emit(updated);
        this.close();
        this.messageService.success('Produto atualizado com sucesso');
      },
      error: () => {
        this.loading = false;
        this.messageService.error('Erro ao atualizar produto');
      }
    });
  }

  close() {
    this.closed.emit();
  }

  private formatToBRL(cents: number): string {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
