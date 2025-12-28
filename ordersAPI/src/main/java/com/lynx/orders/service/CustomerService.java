package com.lynx.orders.service;

import com.lynx.orders.dto.CustomerResponse;
import com.lynx.orders.exception.BusinessException;
import com.lynx.orders.model.Customer;
import com.lynx.orders.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerResponse findByEmail(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Cliente não encontrado"));

        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail()
        );
    }
}
