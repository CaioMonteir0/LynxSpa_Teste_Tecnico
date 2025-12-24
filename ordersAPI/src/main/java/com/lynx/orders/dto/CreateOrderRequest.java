package com.lynx.orders.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateOrderRequest {

    @NotNull(message = "customerId é obrigatório")
    private Long customerId;

    @NotEmpty(message = "Pedido deve ter ao menos um item")
    private List<CreateOrderItemRequest> items;
}
