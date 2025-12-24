package com.lynx.orders.controller;

import com.lynx.orders.dto.CreateOrderRequest;
import com.lynx.orders.dto.OrderDetailResponse;
import com.lynx.orders.dto.OrderResponse;
import com.lynx.orders.model.Order;
import com.lynx.orders.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> create(@RequestBody @Valid CreateOrderRequest request) {
        Order order = orderService.createOrder(request);
        int total = orderService.calculateTotal(order);

        return ResponseEntity.ok(new OrderResponse(order, total));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetailResponse> detail(@PathVariable Long id) {
        Order order = orderService.findById(id);
        int total = orderService.calculateTotal(order);

        return ResponseEntity.ok(new OrderDetailResponse(order, total));
    }
}
