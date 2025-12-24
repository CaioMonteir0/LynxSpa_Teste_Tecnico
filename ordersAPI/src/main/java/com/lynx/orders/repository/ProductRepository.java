package com.lynx.orders.repository;

import com.lynx.orders.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrue();

    List<Product> findByCategory(String category);

    List<Product> findByNameContainingIgnoreCase(String name);

}
