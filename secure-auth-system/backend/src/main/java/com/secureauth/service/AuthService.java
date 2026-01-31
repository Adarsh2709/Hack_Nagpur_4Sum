package com.secureauth.service;

import com.secureauth.model.User;
import com.secureauth.model.AuthRequest;
import com.secureauth.model.AuthResponse;
import com.secureauth.model.VectorData;
import com.secureauth.repository.UserRepository;
import com.secureauth.repository.VectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Arrays;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VectorRepository vectorRepository;

    @Autowired
    private SimilarityService similarityService;

    public AuthResponse registerUser(AuthRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        userRepository.save(user);

        if (request.getVector() != null) {
            VectorData vector = new VectorData();
            vector.setUser(user);
            vector.setVector(request.getVector().toString());
            vectorRepository.save(vector);
        }

        AuthResponse response = new AuthResponse();
        response.setMessage("Registration successful");
        return response;
    }

    public AuthResponse loginUser(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
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
                
                response.setMessage("Login verified with biometric confidence: " + mlResult.get("final_confidence"));
                response.setToken("fake-jwt-token-" + mlResult.get("final_confidence"));
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

    private double[] parseVector(String vecStr) {
        String cleaned = vecStr.replace("[", "").replace("]", "");
        return Arrays.stream(cleaned.split(","))
                .map(String::trim)
                .mapToDouble(Double::parseDouble)
                .toArray();
    }
}
