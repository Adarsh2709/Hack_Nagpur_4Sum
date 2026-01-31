package com.secureauth.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vector_data")
public class VectorData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String vector;
}
