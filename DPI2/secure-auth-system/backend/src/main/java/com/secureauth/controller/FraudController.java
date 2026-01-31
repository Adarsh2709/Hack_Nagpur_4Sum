package com.secureauth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fraud")
public class FraudController {

    @GetMapping("/status")
    public ResponseEntity<?> getFraudStatus() {
        return ResponseEntity.ok("Fraud status endpoint placeholder");
    }
}
