package com.riceshop.ricestore.dto.request;

import com.riceshop.ricestore.entity.enums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserRoleRequest {
    @NotNull
    private Role role;
}