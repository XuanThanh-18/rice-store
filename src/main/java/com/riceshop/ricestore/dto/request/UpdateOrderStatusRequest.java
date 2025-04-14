package com.riceshop.ricestore.dto.request;

import com.riceshop.ricestore.entity.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {
    @NotNull
    private OrderStatus status;

    private String trackingNumber;

    private Boolean paymentStatus;
}