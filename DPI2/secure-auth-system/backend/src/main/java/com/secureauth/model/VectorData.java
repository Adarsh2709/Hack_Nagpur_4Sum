package com.secureauth.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "vector_data")
public class VectorData {
    @Id
    private String id;

    @DBRef
    private User user;

    private String vector;
}
