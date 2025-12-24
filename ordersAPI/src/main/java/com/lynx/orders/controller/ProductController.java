package com.lynx.orders.controller;

import com.lynx.orders.dto.CreateProductRequest;
import com.lynx.orders.dto.ProductResponse;
import com.lynx.orders.model.Product;
import com.lynx.orders.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> create(
            @RequestBody @Valid CreateProductRequest request) {
        Product product = productService.create(request);
        return ResponseEntity.ok(new ProductResponse(product));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> list() {
        return ResponseEntity.ok(
                productService.findAll()
                        .stream()
                        .map(ProductResponse::new)
                        .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> detail(@PathVariable Long id) {
        Product product = productService.findById(id);
        return ResponseEntity.ok(new ProductResponse(product));
    }

}
