package com.riceshop.ricestore.controller;

import com.riceshop.ricestore.dto.request.LoginRequest;
import com.riceshop.ricestore.dto.request.SignupRequest;
import com.riceshop.ricestore.dto.request.TokenRefreshRequest;
import com.riceshop.ricestore.dto.response.JwtResponse;
import com.riceshop.ricestore.dto.response.MessageResponse;
import com.riceshop.ricestore.dto.response.TokenRefreshResponse;
import com.riceshop.ricestore.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        authService.registerUser(signUpRequest);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        TokenRefreshResponse tokenRefreshResponse = authService.refreshToken(request);
        return ResponseEntity.ok(tokenRefreshResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = ((com.riceshop.ricestore.security.service.UserDetailsImpl) userDetails).getId();
        authService.logoutUser(userId);
        return ResponseEntity.ok(new MessageResponse("Log out successful!"));
    }
}