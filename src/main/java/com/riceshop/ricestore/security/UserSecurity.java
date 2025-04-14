package com.riceshop.ricestore.security;

import com.riceshop.ricestore.security.service.UserDetailsImpl;
import org.springframework.stereotype.Component;

@Component("userSecurity")
public class UserSecurity {
    public boolean isCurrentUser(Long userId, UserDetailsImpl userDetails) {
        return userDetails != null && userDetails.getId().equals(userId);
    }
}