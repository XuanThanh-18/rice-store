package com.riceshop.ricestore.controller;

import com.riceshop.ricestore.dto.UserDto;
import com.riceshop.ricestore.dto.request.UpdateUserRequest;
import com.riceshop.ricestore.dto.response.BaseResponse;
import com.riceshop.ricestore.dto.response.MessageResponse;
import com.riceshop.ricestore.security.service.UserDetailsImpl;
import com.riceshop.ricestore.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(BaseResponse.success(users, "Users retrieved successfully"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#id, #userDetails)")
    public ResponseEntity<BaseResponse<UserDto>> getUserById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(BaseResponse.success(user, "User retrieved successfully"));
    }

    @GetMapping("/profile")
    public ResponseEntity<BaseResponse<UserDto>> getCurrentUserProfile(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserDto user = userService.getUserById(userDetails.getId());
        return ResponseEntity.ok(BaseResponse.success(user, "User profile retrieved successfully"));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#id, #userDetails)")
    public ResponseEntity<BaseResponse<UserDto>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest updateRequest,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserDto updatedUser = userService.updateUser(id, updateRequest);
        return ResponseEntity.ok(BaseResponse.success(updatedUser, "User updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<MessageResponse>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(BaseResponse.success(
                new MessageResponse("User deleted successfully"),
                "User deleted successfully"));
    }
}