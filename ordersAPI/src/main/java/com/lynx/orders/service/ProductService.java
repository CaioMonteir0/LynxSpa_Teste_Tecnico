package com.lynx.orders.service;

import com.lynx.orders.dto.CreateProductRequest;
import com.lynx.orders.model.Product;
import com.lynx.orders.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product create(CreateProductRequest request) {
    Product product = Product.builder()
            .name(request.name())
            .category(request.category())
            .priceCents(request.priceCents())
            .active(true)
            .build();

    return productRepository.save(product);
}


    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));
    }
}
