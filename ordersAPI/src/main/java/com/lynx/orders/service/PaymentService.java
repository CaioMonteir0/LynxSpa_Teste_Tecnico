package com.lynx.orders.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.lynx.orders.dto.CreatePaymentRequest;
import com.lynx.orders.exception.BusinessException;
import com.lynx.orders.model.Orders;
import com.lynx.orders.model.Payment;
import com.lynx.orders.repository.OrderRepository;
import com.lynx.orders.repository.PaymentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final OrderService orderService;

    @Transactional
    public Payment pay(CreatePaymentRequest dto) {

        Orders order = orderRepository.findByIdWithItems(dto.getOrderId())
                .orElseThrow(() -> new BusinessException("Pedido não encontrado"));

        if ("PAID".equals(order.getStatus())) {
            throw new BusinessException("Pedido já foi pago");
        }

        if ("CANCELLED".equals(order.getStatus())) {
            throw new BusinessException("Pedido cancelado não pode ser pago");
        }

        paymentRepository.findByOrderId(order.getId())
                .ifPresent(p -> {
                    throw new BusinessException("Pagamento já existe para este pedido");
                });

        int total = orderService.calculateTotal(order);

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setMethod(dto.getMethod());
        payment.setAmountCents(total);
        payment.setStatus("PAID");
        payment.setCreatedAt(LocalDateTime.now());

        order.setStatus("PAID");
        order.setPaymentMethod(dto.getMethod());
        order.setPaidAt(LocalDateTime.now());

        orderRepository.save(order);

        return paymentRepository.save(payment);
    }

}
