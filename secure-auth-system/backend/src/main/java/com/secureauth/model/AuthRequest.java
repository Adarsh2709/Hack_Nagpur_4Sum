package com.secureauth.model;

import lombok.Data;
import java.util.List;

@Data
public class AuthRequest {
    private String email;
    private String password;
    private List<Double> vector;
    private List<List<Double>> vectors;
}
