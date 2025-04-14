package com.riceshop.ricestore.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserRequest {
    @Size(min = 3, max = 20)
    private String username;

    @Email
    private String email;

    @Size(min = 6, max = 40)
    private String password;

    private String fullName;
}