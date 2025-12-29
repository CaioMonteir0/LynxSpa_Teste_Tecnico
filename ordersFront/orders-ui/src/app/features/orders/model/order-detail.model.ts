export interface OrderDetail {
  id: number;
  status: 'NEW' | 'PAID' | 'CANCELLED';
  paidAt?: string;
  paymentMethod?: string;
  items: OrderItemDetail[];
  totalCents: number;
}


export interface OrderItemDetail {
  productName: string;
  quantity: number;
  unitPriceCents: number;
  subtotalCents: number;
}

