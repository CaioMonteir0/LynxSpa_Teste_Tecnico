package com.lynx.orders.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderItemRequest {

    @NotNull(message = "productId é obrigatório")
    private Long productId;

    @Positive(message = "Quantidade deve ser maior que zero")
    private Integer quantity;
}
