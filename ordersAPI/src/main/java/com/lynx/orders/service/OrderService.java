package com.lynx.orders.service;

import com.lynx.orders.exception.BusinessException;
import com.lynx.orders.model.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lynx.orders.repository.ProductRepository;
import com.lynx.orders.repository.OrderRepository;
import com.lynx.orders.repository.OrderItemRepository;
import java.time.LocalDateTime;
import com.lynx.orders.model.Product;
import com.lynx.orders.model.OrderItem;
import com.lynx.orders.dto.CreateOrderRequest;
import com.lynx.orders.dto.CreateOrderItemRequest;


@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;


    public int calculateTotal(Order order) {
        return order.getItems().stream()
                .mapToInt(i -> i.getQuantity() * i.getUnitPriceCents())
                .sum();
    }

    public Order findById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Pedido não encontrado"));
    }

    @Transactional
    public Order createOrder(CreateOrderRequest dto) {

        Order order = new Order();
        order.setStatus("NEW");
        order.setCreatedAt(LocalDateTime.now());

        order = orderRepository.save(order);

        for (CreateOrderItemRequest item : dto.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            if (!product.getActive()) {
                throw new RuntimeException("Produto inativo: " + product.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUnitPriceCents(product.getPriceCents());

            orderItemRepository.save(orderItem);
        }

        return order;
    }

}
