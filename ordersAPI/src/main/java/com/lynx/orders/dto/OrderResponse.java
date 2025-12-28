package com.lynx.orders.dto;

import com.lynx.orders.model.Orders;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class OrderResponse {

    private Long id;
    private String status;
    private LocalDateTime createdAt;
    private int totalCents;

    public OrderResponse(Orders order, int totalCents) {
        this.id = order.getId();
        this.status = order.getStatus();
        this.createdAt = order.getCreatedAt();
        this.totalCents = totalCents;
    }
}
