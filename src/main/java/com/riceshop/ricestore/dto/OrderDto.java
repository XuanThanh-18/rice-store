package com.riceshop.ricestore.dto;

import com.riceshop.ricestore.entity.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private Long userId;
    private String username;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private String shippingAddress;
    private String billingAddress;
    private String phoneNumber;
    private String paymentMethod;
    private Boolean paymentStatus;
    private String trackingNumber;
    private LocalDateTime deliveryDate;
    private LocalDateTime updatedAt;
    private List<OrderItemDto> items;
    private String notes;
}