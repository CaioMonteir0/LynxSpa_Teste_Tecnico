package com.lynx.orders.repository;

import com.lynx.orders.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    @Query("""
        SELECT o FROM Orders o
        LEFT JOIN FETCH o.items
        WHERE o.id = :id
    """)
    Optional<Orders> findByIdWithItems(@Param("id") Long id);

    @Query("""
        SELECT DISTINCT o FROM Orders o
        LEFT JOIN FETCH o.items
    """)
    List<Orders> findAllWithItems();
}
