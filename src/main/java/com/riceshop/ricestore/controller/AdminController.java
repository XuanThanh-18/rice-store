package com.riceshop.ricestore.controller;

import com.riceshop.ricestore.dto.UserDto;
import com.riceshop.ricestore.dto.request.UpdateUserRoleRequest;
import com.riceshop.ricestore.dto.response.BaseResponse;
import com.riceshop.ricestore.dto.response.MessageResponse;
import com.riceshop.ricestore.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<BaseResponse<Page<UserDto>>> getAllUsers(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,asc") String[] sort) {

        Pageable pageable = createPageable(page, size, sort);
        Page<UserDto> users;

        if (keyword != null && !keyword.isEmpty()) {
            users = userService.searchUsers(keyword, pageable);
        } else {
            users = userService.getAllUsersPage(pageable);
        }

        return ResponseEntity.ok(BaseResponse.success(users, "Users retrieved successfully"));
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<BaseResponse<UserDto>> updateUserRole(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRoleRequest request) {

        UserDto updatedUser = userService.updateUserRole(id, request.getRole());
        return ResponseEntity.ok(BaseResponse.success(updatedUser, "User role updated successfully"));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<BaseResponse<MessageResponse>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(BaseResponse.success(
                new MessageResponse("User deleted successfully"),
                "User deleted successfully"));
    }

    private Pageable createPageable(int page, int size, String[] sort) {
        Sort.Direction direction = Sort.Direction.ASC;
        String property = "id";

        if (sort[0].contains(",")) {
            String[] parts = sort[0].split(",");
            property = parts[0];
            direction = parts[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        } else if (sort.length > 1) {
            property = sort[0];
            direction = sort[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        }

        return PageRequest.of(page, size, Sort.by(direction, property));
    }
}