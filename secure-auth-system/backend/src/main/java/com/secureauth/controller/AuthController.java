package com.secureauth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Object request) {
        return ResponseEntity.ok("Registration endpoint placeholder");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Object request) {
        return ResponseEntity.ok("Login endpoint placeholder");
    }
}
