import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../../core/ui/message.service';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../model/product.model';
@Component({
    standalone: true,
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css'],
    imports: [CommonModule, FormsModule]
})
export class ProductFormComponent {

    constructor(
        private messageService: MessageService,
        private productsService: ProductsService
    ) { }

    priceFormatted = '';
    priceInvalid = false;
    imagePreview?: string;
    imageInvalid = false;
    imageError = false;


    product: Product = {
        name: '',
        category: '',
        priceCents: 0,
        active: true,
        
    };

    validatePrice(): boolean {
        this.priceInvalid = this.product.priceCents <= 0;
        return !this.priceInvalid;
    }


    onPriceInput(event: Event) {
        const input = event.target as HTMLInputElement | null;

        if (!input) {
            return;
        }

        const value = input.value;

        const digits = value.replace(/\D/g, '');

        this.product.priceCents = digits ? Number(digits) : 0;

        this.priceFormatted = this.formatToBRL(this.product.priceCents);

        this.validatePrice();
    }


    private formatToBRL(cents: number): string {
        const value = cents / 100;
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    resetForm() {
        this.product = {
            name: '',
            category: '',
            priceCents: 0,
            active: true,
            imageUrl: ''
        };

        this.priceFormatted = '';
        this.priceInvalid = false;
    }

    onImageUrlChange() {
        if (!this.product.imageUrl) return;

        const img = new Image();
        img.onload = () => {
            this.imagePreview = this.product.imageUrl!;
            this.imageInvalid = false;
        };
        img.onerror = () => {
            this.imagePreview = undefined;
            this.imageInvalid = true;
        };
        console.log("Url da imagem:",this.product.imageUrl);
        img.src = this.product.imageUrl;
    }



    save() {
        if (!this.validatePrice()) {
            this.messageService.error('Preço inválido');
            return;
        }

        this.productsService.create(this.product).subscribe({
            next: () => {
                this.messageService.success('Produto cadastrado com sucesso');
                this.resetForm();
            },
            error: () => {
                this.messageService.error('Erro ao cadastrar produto');
            }
        });
    }

}
