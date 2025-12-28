package com.lynx.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomerResponse {
    private Long id;
    private String name;
    private String email;
}
