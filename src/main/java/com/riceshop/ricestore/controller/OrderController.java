package com.riceshop.ricestore.controller;

import com.riceshop.ricestore.dto.OrderDto;
import com.riceshop.ricestore.dto.request.CreateOrderRequest;
import com.riceshop.ricestore.dto.request.UpdateOrderStatusRequest;
import com.riceshop.ricestore.dto.response.BaseResponse;
import com.riceshop.ricestore.dto.response.MessageResponse;
import com.riceshop.ricestore.entity.enums.OrderStatus;
import com.riceshop.ricestore.security.service.UserDetailsImpl;
import com.riceshop.ricestore.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<Page<OrderDto>>> getAllOrders(
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "orderDate,desc") String[] sort) {

        Pageable pageable = createPageable(page, size, sort);

        Page<OrderDto> orders;
        if (status != null || startDate != null || endDate != null) {
            orders = orderService.getOrdersWithFilter(status, startDate, endDate, pageable);
        } else {
            orders = orderService.getAllOrders(pageable);
        }

        return ResponseEntity.ok(BaseResponse.success(orders, "Orders retrieved successfully"));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<BaseResponse<Page<OrderDto>>> getMyOrders(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "orderDate,desc") String[] sort) {

        Pageable pageable = createPageable(page, size, sort);

        Page<OrderDto> orders;
        if (status != null) {
            orders = orderService.getOrdersByUserAndStatus(userDetails.getUsername(), status, pageable);
        } else {
            orders = orderService.getOrdersByUser(userDetails.getUsername(), pageable);
        }

        return ResponseEntity.ok(BaseResponse.success(orders, "Orders retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<OrderDto>> getOrderById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        OrderDto order = orderService.getOrderById(id, userDetails.getUsername());
        return ResponseEntity.ok(BaseResponse.success(order, "Order retrieved successfully"));
    }

    @PostMapping
    public ResponseEntity<BaseResponse<OrderDto>> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        OrderDto createdOrder = orderService.createOrder(userDetails.getUsername(), request);
        return new ResponseEntity<>(
                BaseResponse.success(createdOrder, "Order created successfully"),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<OrderDto>> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateOrderStatusRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        OrderDto updatedOrder = orderService.updateOrderStatus(id, request, userDetails.getUsername());
        return ResponseEntity.ok(BaseResponse.success(updatedOrder, "Order status updated successfully"));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<BaseResponse<OrderDto>> cancelOrder(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        OrderDto cancelledOrder = orderService.cancelOrder(id, userDetails.getUsername());
        return ResponseEntity.ok(BaseResponse.success(cancelledOrder, "Order cancelled successfully"));
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<Map<String, Object>>> getDashboardData(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {

        // Default to last 30 days if not specified
        if (startDate == null) {
            startDate = LocalDateTime.now().minusDays(30);
        }
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }

        // Calculate dashboard data
        BigDecimal totalRevenue = orderService.calculateTotalRevenue(startDate, endDate);
        Long pendingOrders = orderService.countOrdersByStatus(OrderStatus.PENDING);
        Long processingOrders = orderService.countOrdersByStatus(OrderStatus.PROCESSING);
        Long shippedOrders = orderService.countOrdersByStatus(OrderStatus.SHIPPED);
        Long deliveredOrders = orderService.countOrdersByStatus(OrderStatus.DELIVERED);
        Long cancelledOrders = orderService.countOrdersByStatus(OrderStatus.CANCELLED);

        // Prepare response
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("totalRevenue", totalRevenue);
        dashboardData.put("pendingOrders", pendingOrders);
        dashboardData.put("processingOrders", processingOrders);
        dashboardData.put("shippedOrders", shippedOrders);
        dashboardData.put("deliveredOrders", deliveredOrders);
        dashboardData.put("cancelledOrders", cancelledOrders);
        dashboardData.put("startDate", startDate);
        dashboardData.put("endDate", endDate);

        return ResponseEntity.ok(BaseResponse.success(dashboardData, "Dashboard data retrieved successfully"));
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