package com.lynx.orders.controller;

import com.lynx.orders.dto.CustomerResponse;
import com.lynx.orders.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/find-by-email")
    public CustomerResponse findByEmail(@RequestParam String email) {
        return customerService.findByEmail(email);
    }
}
