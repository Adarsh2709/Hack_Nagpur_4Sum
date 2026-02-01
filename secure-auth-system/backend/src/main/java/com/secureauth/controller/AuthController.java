package com.secureauth.controller;

import com.secureauth.model.AuthRequest;
import com.secureauth.model.AuthResponse;
import com.secureauth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        boolean dbConnected = authService.isDatabaseConnected();
        Map<String, Object> status = new java.util.HashMap<>();
        status.put("status", dbConnected ? "UP" : "DEGRADED");
        status.put("database", dbConnected ? "CONNECTED" : "AUTH_FAILED_OR_DISCONNECTED");
        status.put("message", dbConnected ? "System ready" : "Check application.yml for correct Atlas credentials");
        
        return ResponseEntity.ok(status);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            return ResponseEntity.ok(authService.registerUser(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            return ResponseEntity.ok(authService.loginUser(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage()));
        }
    }
}
