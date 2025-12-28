package com.lynx.orders.dto;

import com.lynx.orders.model.Orders;
import lombok.Getter;

import java.util.List;

@Getter
public class OrderDetailResponse {

    private Long id;
    private String status;
    private List<OrderItemResponse> items;
    private int totalCents;

    public OrderDetailResponse(Orders order, int totalCents) {
        this.id = order.getId();
        this.status = order.getStatus();
        this.items = order.getItems()
                .stream()
                .map(OrderItemResponse::new)
                .toList();
        this.totalCents = totalCents;
    }
}
