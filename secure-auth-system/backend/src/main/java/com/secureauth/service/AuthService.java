package com.secureauth.service;

import com.secureauth.model.User;
import com.secureauth.model.AuthRequest;
import com.secureauth.model.AuthResponse;
import com.secureauth.model.VectorData;
import com.secureauth.repository.UserRepository;
import com.secureauth.repository.VectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private VectorRepository vectorRepository;

    @Autowired
    private SimilarityService similarityService;

    public AuthResponse registerUser(AuthRequest request) {
        // Overwrite if exists, or create new
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(new User());
        
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userRepository.save(user);
        
        // Clear old vectors
        List<VectorData> oldVectors = vectorRepository.findByUserId(user.getId());
        if (oldVectors != null && !oldVectors.isEmpty()) {
            vectorRepository.deleteAll(oldVectors);
        }
        
        // Save new vectors
        if (request.getVectors() != null) {
            for (List<Double> vec : request.getVectors()) {
                VectorData vector = new VectorData();
                vector.setUser(user);
                vector.setVector(vec.toString());
                vectorRepository.save(vector);
            }
        }

        AuthResponse response = new AuthResponse();
        response.setMessage("Registration successful");
        return response;
    }

    public AuthResponse loginUser(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        List<VectorData> userVectors = vectorRepository.findByUserId(user.getId());
        
        AuthResponse response = new AuthResponse();
        
        if (!userVectors.isEmpty() && request.getVector() != null) {
            List<double[]> enrollment = userVectors.stream()
                    .map(v -> parseVector(v.getVector()))
                    .collect(Collectors.toList());
            
            // If we have less than 10, just use what we have, but the ML model expects 10.
            // For this demo, if we have at least 1, we try to call it.
            if (enrollment.size() > 0) {
                // Pad to 10 if necessary for the ML model
                while (enrollment.size() < 10) {
                    enrollment.add(enrollment.get(0));
                }
                
                double[] candidate = request.getVector().stream().mapToDouble(Double::doubleValue).toArray();
                Map<String, Object> mlResult = similarityService.calculateSimilarity(enrollment, candidate);
                
                double confidence = (double) mlResult.getOrDefault("final_confidence", 0.0);
                
                if (confidence < 0.85) {
                    throw new RuntimeException("Biometric verification failed: Confidence " + String.format("%.2f", confidence) + " below 85%");
                }
                
                response.setMessage("Login verified with biometric confidence: " + String.format("%.2f", confidence));
                response.setToken("fake-jwt-token-" + confidence);
            } else {
                response.setMessage("Login success (no biometric profile)");
                response.setToken("fake-jwt-token");
            }
        } else {
            response.setMessage("Login success");
            response.setToken("fake-jwt-token");
        }
        
        return response;
    }

    public boolean isDatabaseConnected() {
        try {
            userRepository.count();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private double[] parseVector(String vecStr) {
        String cleaned = vecStr.replace("[", "").replace("]", "");
        return Arrays.stream(cleaned.split(","))
                .map(String::trim)
                .mapToDouble(Double::parseDouble)
                .toArray();
    }
}
