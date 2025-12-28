export interface CreateOrderItemDTO {
    productId: number;
    quantity: number;
}


export interface CreateOrderDTO {
    customerId: number;
    items: CreateOrderItemDTO[];
}

export interface CreateOrderResponse {
    id: number;
}