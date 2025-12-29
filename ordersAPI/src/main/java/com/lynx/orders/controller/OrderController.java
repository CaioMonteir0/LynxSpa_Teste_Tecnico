package com.lynx.orders.controller;

import com.lynx.orders.dto.CreateOrderRequest;
import com.lynx.orders.dto.CreateOrderResponse;
import com.lynx.orders.dto.OrderDetailResponse;
import com.lynx.orders.dto.OrderResponse;
import com.lynx.orders.model.Orders;
import com.lynx.orders.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<CreateOrderResponse> create(
            @RequestBody @Valid CreateOrderRequest request) {
        Orders order = orderService.createOrder(request);
        return ResponseEntity.ok(new CreateOrderResponse(order.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetailResponse> detail(@PathVariable Long id) {
        Orders order = orderService.findByIdWithItems(id);
        int total = orderService.calculateTotal(order);

        return ResponseEntity.ok(new OrderDetailResponse(order, total));
    }

    @GetMapping
    public List<Orders> findAll() {
        return orderService.findAll();
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<OrderResponse> cancel(@PathVariable Long id) {

        Orders order = orderService.cancelOrder(id);
        int total = orderService.calculateTotal(order);

        return ResponseEntity.ok(new OrderResponse(order, total));
    }

}
