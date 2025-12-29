package com.lynx.orders.service;

import com.lynx.orders.exception.BusinessException;
import com.lynx.orders.model.Customer;
import com.lynx.orders.model.Orders;
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
import com.lynx.orders.repository.CustomerRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;

    public int calculateTotal(Orders order) {
        return order.getItems().stream()
                .mapToInt(i -> i.getQuantity() * i.getUnitPriceCents())
                .sum();
    }

    public Orders findByIdWithItems(Long id) {
        return orderRepository.findByIdWithItems(id)
                .orElseThrow(() -> new BusinessException("Pedido não encontrado"));
    }

    public Orders findById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Pedido não encontrado"));
    }

    @Transactional
    public Orders createOrder(CreateOrderRequest dto) {

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new BusinessException("Cliente não encontrado"));

        Orders order = new Orders();
        order.setStatus("NEW");
        order.setCreatedAt(LocalDateTime.now());
        order.setCustomer(customer);

        int totalCents = 0;

        for (CreateOrderItemRequest item : dto.getItems()) {

            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new BusinessException("Produto não encontrado"));

            if (!Boolean.TRUE.equals(product.getActive())) {
                throw new BusinessException("Produto inativo: " + product.getName());
            }

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new BusinessException(
                        "Estoque insuficiente para o produto: " + product.getName());
            }

            product.setStockQuantity(
                    product.getStockQuantity() - item.getQuantity());

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUnitPriceCents(product.getPriceCents());

            order.getItems().add(orderItem);

            totalCents += item.getQuantity() * product.getPriceCents();
        }

        order.setTotalCents(totalCents);

        return orderRepository.save(order);
    }

    public List<Orders> findAll() {
        return orderRepository.findAllWithItems();
    }

    @Transactional
    public Orders cancelOrder(Long orderId) {

        Orders order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new BusinessException("Pedido não encontrado"));

        if ("CANCELLED".equals(order.getStatus())) {
            throw new BusinessException("Pedido já está cancelado");
        }

        if (!"NEW".equals(order.getStatus()) && !"PAID".equals(order.getStatus())) {
            throw new BusinessException("Pedido não pode ser cancelado no status atual");
        }

       
        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            product.setStockQuantity(
                    product.getStockQuantity() + item.getQuantity());
        }

        order.setStatus("CANCELLED");

        return orderRepository.save(order);
    }

}
