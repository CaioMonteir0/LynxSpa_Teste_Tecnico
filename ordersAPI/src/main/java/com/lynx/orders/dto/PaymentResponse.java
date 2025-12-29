package com.lynx.orders.dto;

import lombok.Getter;

@Getter
public class PaymentResponse {

    private Long id;
    private String status;
    private String method;
    private int amountCents;

    public PaymentResponse(Long id, String status, String method, int amountCents) {
        this.id = id;
        this.status = status;
        this.method = method;
        this.amountCents = amountCents;
    }
}
