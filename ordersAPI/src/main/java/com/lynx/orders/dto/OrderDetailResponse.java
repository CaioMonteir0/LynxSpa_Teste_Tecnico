package com.lynx.orders.dto;

import com.lynx.orders.model.Orders;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class OrderDetailResponse {

    private Long id;
    private String status;
    private LocalDateTime paidAt;
    private String paymentMethod;
    private List<OrderItemResponse> items;
    private int totalCents;

    public OrderDetailResponse(Orders order, int totalCents) {
        this.id = order.getId();
        this.status = order.getStatus();
        this.paidAt = order.getPaidAt();
        this.paymentMethod = order.getPaymentMethod();
        this.items = order.getItems()
                .stream()
                .map(OrderItemResponse::new)
                .toList();
        this.totalCents = totalCents;
    }
}
