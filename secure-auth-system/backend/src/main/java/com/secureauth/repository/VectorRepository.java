package com.secureauth.repository;

import com.secureauth.model.VectorData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VectorRepository extends MongoRepository<VectorData, String> {
    List<VectorData> findByUserId(String userId);
}
