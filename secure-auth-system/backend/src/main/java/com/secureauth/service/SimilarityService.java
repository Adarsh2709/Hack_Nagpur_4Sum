package com.secureauth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SimilarityService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String ML_SERVICE_URL = System.getenv("ML_SERVICE_URL") != null 
        ? System.getenv("ML_SERVICE_URL") 
        : "http://localhost:5005/api/ml/process";

    public Map<String, Object> calculateSimilarity(List<double[]> enrollment, double[] candidate) {
        Map<String, Object> request = new HashMap<>();
        request.put("enrollment", enrollment);
        request.put("candidate", candidate);
        
        try {
            return restTemplate.postForObject(ML_SERVICE_URL, request, Map.class);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return error;
        }
    }
}
