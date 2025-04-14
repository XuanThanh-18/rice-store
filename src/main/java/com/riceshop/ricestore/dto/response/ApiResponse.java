package com.riceshop.ricestore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;
    private int status;

    public static <T> ApiResponse<T> of(boolean success, String message, T data, HttpStatus status) {
        return ApiResponse.<T>builder()
                .success(success)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .build();
    }

    public static <T> ApiResponse<T> success(T data) {
        return of(true, "Success", data, HttpStatus.OK);
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return of(true, message, data, HttpStatus.OK);
    }

    public static <T> ApiResponse<T> success(T data, String message, HttpStatus status) {
        return of(true, message, data, status);
    }

    public static <T> ApiResponse<T> error(String message) {
        return of(false, message, null, HttpStatus.BAD_REQUEST);
    }

    public static <T> ApiResponse<T> error(String message, HttpStatus status) {
        return of(false, message, null, status);
    }

    public static <T> ResponseEntity<ApiResponse<T>> toResponseEntity(ApiResponse<T> response) {
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    public static <T> ResponseEntity<ApiResponse<T>> toResponseEntity(T data) {
        return toResponseEntity(success(data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> toResponseEntity(T data, String message) {
        return toResponseEntity(success(data, message));
    }

    public static <T> ResponseEntity<ApiResponse<T>> toResponseEntity(T data, String message, HttpStatus status) {
        return toResponseEntity(success(data, message, status));
    }

    public static <T> ResponseEntity<ApiResponse<T>> errorResponse(String message) {
        return toResponseEntity(error(message));
    }

    public static <T> ResponseEntity<ApiResponse<T>> errorResponse(String message, HttpStatus status) {
        return toResponseEntity(error(message, status));
    }
}