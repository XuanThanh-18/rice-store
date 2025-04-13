package com.riceshop.ricestore.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String imageUrl;
    private String origin;
    private String riceType;
    private String weight;
    private LocalDateTime createdAt;
    private String createdBy;
    private Boolean isActive;
}
