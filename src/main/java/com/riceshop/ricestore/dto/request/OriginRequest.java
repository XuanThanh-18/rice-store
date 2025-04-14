package com.riceshop.ricestore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class OriginRequest {
    @NotBlank
    private String name;

    private String description;

    @Size(min = 2, max = 2)
    private String countryCode;
}