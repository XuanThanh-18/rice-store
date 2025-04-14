package com.riceshop.ricestore.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateOrderRequest {
    @NotBlank
    private String shippingAddress;

    @NotBlank
    private String billingAddress;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String paymentMethod;

    private String notes;
}