package com.lynx.orders.dto;

import com.lynx.orders.model.Product;
import lombok.Getter;

@Getter
public class ProductResponse {

    private Long id;
    private String name;
    private String category;
    private Integer priceCents;
    private Boolean active;

    public ProductResponse(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.category = product.getCategory();
        this.priceCents = product.getPriceCents();
        this.active = product.getActive();
    }
}
