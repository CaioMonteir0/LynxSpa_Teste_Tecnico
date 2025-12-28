import { Product } from '../../products/model/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}
