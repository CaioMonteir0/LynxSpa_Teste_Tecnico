export interface OrderSummary {
  id: number;
  status: 'NEW' | 'PAID' | 'CANCELLED';
  createdAt: string;
  totalCents: number;
}
