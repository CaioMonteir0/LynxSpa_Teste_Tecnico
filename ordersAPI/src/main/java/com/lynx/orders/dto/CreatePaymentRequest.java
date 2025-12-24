package com.lynx.orders.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePaymentRequest {

    @NotNull(message = "orderId é obrigatório")
    private Long orderId;

    @NotNull(message = "Método de pagamento é obrigatório")
    private String method;

    @Positive(message = "Valor do pagamento deve ser maior que zero")
    private Integer amountCents;
}
