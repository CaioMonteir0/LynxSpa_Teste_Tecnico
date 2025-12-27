import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../model/product.model';
import { ProductsService } from '../../services/product.service';
import { MessageService } from '../../../../core/ui/message.service';
@Component({
  standalone: true,
  selector: 'app-product-delete-modal',
  imports: [CommonModule],
  templateUrl: './product-delete-modal.component.html'
})
export class ProductDeleteModalComponent {

  @Input() product?: Product;
  @Input() show = false;

  @Output() deleted = new EventEmitter<number>();
  @Output() closed = new EventEmitter<void>();

  loading = false;
  

  constructor(private productsService: ProductsService, private messageService: MessageService) {}

  confirmDelete() {
    if (!this.product?.id) return;

    this.loading = true;

    this.productsService.delete(this.product.id).subscribe({
      next: () => {
        this.loading = false;
        this.deleted.emit(this.product!.id);
        this.close();
        
        this.messageService.success('Produto excluído com sucesso');
      },
      error: () => {
        this.loading = false;
        this.messageService.error('Erro ao excluir produto');
      }
    });
  }

  close() {
    this.closed.emit();
  }
}
