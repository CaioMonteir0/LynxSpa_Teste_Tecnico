package com.lynx.orders.dto;

import com.lynx.orders.model.Order;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class OrderResponse {

    private Long id;
    private String status;
    private LocalDateTime createdAt;
    private int totalCents;

    public OrderResponse(Order order, int totalCents) {
        this.id = order.getId();
        this.status = order.getStatus();
        this.createdAt = order.getCreatedAt();
        this.totalCents = totalCents;
    }
}
