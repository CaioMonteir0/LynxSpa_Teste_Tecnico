package com.lynx.orders.repository;

import com.lynx.orders.model.Payment;
import com.lynx.orders.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("""
        SELECT COALESCE(SUM(p.amountCents), 0)
        FROM Payment p
        WHERE p.order = :order
    """)
    int sumByOrder(Orders order);
}
