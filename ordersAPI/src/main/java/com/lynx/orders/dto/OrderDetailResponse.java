package com.lynx.orders.dto;

import com.lynx.orders.model.Order;
import lombok.Getter;

import java.util.List;

@Getter
public class OrderDetailResponse {

    private Long id;
    private String status;
    private List<OrderItemResponse> items;
    private int totalCents;

    public OrderDetailResponse(Order order, int totalCents) {
        this.id = order.getId();
        this.status = order.getStatus();
        this.items = order.getItems()
                .stream()
                .map(OrderItemResponse::new)
                .toList();
        this.totalCents = totalCents;
    }
}
