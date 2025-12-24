package com.lynx.orders.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateProductRequest(

        @NotBlank
        String name,

        @NotBlank
        String category,

        @NotNull
        Integer priceCents
) {
}
