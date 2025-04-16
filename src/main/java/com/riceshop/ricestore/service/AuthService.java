package com.riceshop.ricestore.service;

import com.riceshop.ricestore.dto.request.LoginRequest;
import com.riceshop.ricestore.dto.request.SignupRequest;
import com.riceshop.ricestore.dto.request.TokenRefreshRequest;
import com.riceshop.ricestore.dto.response.JwtResponse;
import com.riceshop.ricestore.dto.response.TokenRefreshResponse;
import com.riceshop.ricestore.entity.RefreshToken;
import com.riceshop.ricestore.entity.User;
import com.riceshop.ricestore.entity.enums.Role;
import com.riceshop.ricestore.exception.BadRequestException;
import com.riceshop.ricestore.exception.TokenRefreshException;
import com.riceshop.ricestore.repository.UserRepository;
import com.riceshop.ricestore.security.jwt.JwtUtils;
import com.riceshop.ricestore.security.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RefreshTokenService refreshTokenService;
//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        try {
            // Kiểm tra người dùng trước khi xác thực
//            User user = userRepository.findByUsername(loginRequest.getUsername())
//                    .orElse(null);
//
//            if (user == null) {
//                System.out.println("DEBUG: User not found in database: " + loginRequest.getUsername());
//                throw new BadCredentialsException("User not found");
//            } else {
//                System.out.println("DEBUG: User found: " + user.getUsername());
//                System.out.println("DEBUG: Password format in DB: " + user.getPassword());
//                // Kiểm tra password encoder
//                boolean matches = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
//                System.out.println("DEBUG: Password matches: " + matches);
//            }
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            String role = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst()
                    .orElse("");

            // Create refresh token
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

            return JwtResponse.builder()
                    .token(jwt)
                    .refreshToken(refreshToken.getToken())
                    .id(userDetails.getId())
                    .username(userDetails.getUsername())
                    .email(userDetails.getEmail())
                    .role(role)
                    .build();
        }catch(Exception e) {
            e.printStackTrace();
            // In hoặc log chi tiết lỗi
            System.out.println("Error in authentication: " + e.getMessage());
            throw e; // Chuyển tiếp ngoại lệ
        }
    }

    public TokenRefreshResponse refreshToken(TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    return TokenRefreshResponse.builder()
                            .accessToken(token)
                            .refreshToken(requestRefreshToken)
                            .build();
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

    public void registerUser(SignupRequest signupRequest) {
        // Validate if username exists
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new BadRequestException("Username is already taken!");
        }

        // Validate if email exists
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new BadRequestException("Email is already in use!");
        }

        // Create new user
        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(encoder.encode(signupRequest.getPassword()));
        user.setFullName(signupRequest.getFullName());
        user.setRole(Role.ROLE_USER);

        userRepository.save(user);
    }

    public void logoutUser(Long userId) {
        refreshTokenService.deleteByUserId(userId);
    }
}