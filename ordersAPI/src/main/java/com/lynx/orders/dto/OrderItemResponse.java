package com.lynx.orders.dto;

import com.lynx.orders.model.OrderItem;
import lombok.Getter;

@Getter
public class OrderItemResponse {

    private String productName;
    private Integer quantity;
    private Integer unitPriceCents;
    private Integer subtotalCents;

    public OrderItemResponse(OrderItem item) {
        this.productName = item.getProduct().getName();
        this.quantity = item.getQuantity();
        this.unitPriceCents = item.getUnitPriceCents();
        this.subtotalCents = item.getQuantity() * item.getUnitPriceCents();
    }
}
