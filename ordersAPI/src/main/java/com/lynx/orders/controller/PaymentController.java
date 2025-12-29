package com.lynx.orders.controller;

import org.springframework.web.bind.annotation.*;
import com.lynx.orders.dto.CreatePaymentRequest;
import com.lynx.orders.dto.PaymentResponse;
import com.lynx.orders.model.Payment;
import com.lynx.orders.service.PaymentService;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentResponse> pay(
            @RequestBody @Valid CreatePaymentRequest request) {

        Payment payment = paymentService.pay(request);

        return ResponseEntity.ok(
                new PaymentResponse(
                        payment.getId(),
                        payment.getStatus(),
                        payment.getMethod(),
                        payment.getAmountCents()
                )
        );
    }
}

