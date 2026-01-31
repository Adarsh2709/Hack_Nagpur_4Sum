package com.secureauth.repository;

import com.secureauth.model.VectorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VectorRepository extends JpaRepository<VectorData, Long> {
    List<VectorData> findByUserId(Long userId);
}
