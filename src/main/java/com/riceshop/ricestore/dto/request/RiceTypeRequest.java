package com.riceshop.ricestore.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RiceTypeRequest {
    @NotBlank
    private String name;

    private String description;
}