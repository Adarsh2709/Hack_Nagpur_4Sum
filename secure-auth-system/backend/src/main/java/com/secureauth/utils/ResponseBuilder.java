package com.secureauth.utils;

import org.springframework.http.ResponseEntity;

public class ResponseBuilder {
    public static ResponseEntity<?> buildResponse(Object body) {
        return ResponseEntity.ok(body);
    }
}
