package com.riceshop.ricestore.service;

import com.riceshop.ricestore.dto.OrderDto;
import com.riceshop.ricestore.dto.OrderItemDto;
import com.riceshop.ricestore.dto.request.CreateOrderRequest;
import com.riceshop.ricestore.dto.request.UpdateOrderStatusRequest;
import com.riceshop.ricestore.entity.*;
import com.riceshop.ricestore.entity.enums.OrderStatus;
import com.riceshop.ricestore.exception.BadRequestException;
import com.riceshop.ricestore.exception.ResourceNotFoundException;
import com.riceshop.ricestore.exception.UnauthorizedException;
import com.riceshop.ricestore.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartService cartService;

    public Page<OrderDto> getAllOrders(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        return orders.map(this::mapToDto);
    }

    public Page<OrderDto> getOrdersByUser(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Page<Order> orders = orderRepository.findByUser(user, pageable);
        return orders.map(this::mapToDto);
    }

    public Page<OrderDto> getOrdersByStatus(OrderStatus status, Pageable pageable) {
        Page<Order> orders = orderRepository.findByStatus(status, pageable);
        return orders.map(this::mapToDto);
    }

    public Page<OrderDto> getOrdersWithFilter(OrderStatus status, LocalDateTime startDate,
                                              LocalDateTime endDate, Pageable pageable) {
        Page<Order> orders = orderRepository.findOrdersWithFilter(status, startDate, endDate, pageable);
        return orders.map(this::mapToDto);
    }

    public OrderDto getOrderById(Long id, String username) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        // Check if the order belongs to the user or user is admin
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        if (!order.getUser().getId().equals(user.getId()) && !user.getRole().name().equals("ROLE_ADMIN")) {
            throw new UnauthorizedException("You are not authorized to view this order");
        }

        return mapToDto(order);
    }

    @Transactional
    public OrderDto createOrder(String username, CreateOrderRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + username));

        if (cart.getCartItems().isEmpty()) {
            throw new BadRequestException("Cannot create order with empty cart");
        }

        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(cart.getTotalAmount());
        order.setStatus(OrderStatus.PENDING);
        order.setShippingAddress(request.getShippingAddress());
        order.setBillingAddress(request.getBillingAddress());
        order.setPhoneNumber(request.getPhoneNumber());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setPaymentStatus(false);
        order.setNotes(request.getNotes());

        Order savedOrder = orderRepository.save(order);

        // Create order items from cart items
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();

            // Check if product is still active and has enough stock
            if (!product.getIsActive()) {
                throw new BadRequestException("Product '" + product.getName() + "' is no longer available");
            }

            if (product.getStockQuantity() < cartItem.getQuantity()) {
                throw new BadRequestException("Not enough stock for product '" + product.getName() + "'");
            }

            // Update product stock
            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            productRepository.save(product);

            // Create order item
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getUnitPrice());
            orderItem.setSubtotal(cartItem.getSubtotal());

            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }

        // Set order items and clear cart
        savedOrder.setItems(orderItems);
        cartService.clearCart(username);

        return mapToDto(savedOrder);
    }

    @Transactional
    public OrderDto updateOrderStatus(Long orderId, UpdateOrderStatusRequest request, String username) {
        // Check if user is admin
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        if (!user.getRole().name().equals("ROLE_ADMIN")) {
            throw new UnauthorizedException("Only administrators can update order status");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        // Update order status
        order.setStatus(request.getStatus());

        // Update tracking number if provided
        if (request.getTrackingNumber() != null) {
            order.setTrackingNumber(request.getTrackingNumber());
        }

        // Update payment status if provided
        if (request.getPaymentStatus() != null) {
            order.setPaymentStatus(request.getPaymentStatus());
        }

        // If status is DELIVERED, set delivery date
        if (request.getStatus() == OrderStatus.DELIVERED) {
            order.setDeliveryDate(LocalDateTime.now());
        }

        // If status is CANCELLED, restore product stock
        if (request.getStatus() == OrderStatus.CANCELLED &&
                (order.getStatus() != OrderStatus.CANCELLED && order.getStatus() != OrderStatus.REFUNDED)) {
            restoreProductStock(order);
        }

        Order updatedOrder = orderRepository.save(order);
        return mapToDto(updatedOrder);
    }

    @Transactional
    public OrderDto cancelOrder(Long orderId, String username) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        // Check if the order belongs to the user or user is admin
        if (!order.getUser().getId().equals(user.getId()) && !user.getRole().name().equals("ROLE_ADMIN")) {
            throw new UnauthorizedException("You are not authorized to cancel this order");
        }

        // Check if order can be cancelled
        if (order.getStatus() != OrderStatus.PENDING && order.getStatus() != OrderStatus.PROCESSING) {
            throw new BadRequestException("Cannot cancel order with status: " + order.getStatus());
        }

        // Cancel order and restore product stock
        order.setStatus(OrderStatus.CANCELLED);
        restoreProductStock(order);

        Order updatedOrder = orderRepository.save(order);
        return mapToDto(updatedOrder);
    }

    private void restoreProductStock(Order order) {
        for (OrderItem orderItem : order.getItems()) {
            Product product = orderItem.getProduct();
            product.setStockQuantity(product.getStockQuantity() + orderItem.getQuantity());
            productRepository.save(product);
        }
    }

    public BigDecimal calculateTotalRevenue(LocalDateTime startDate, LocalDateTime endDate) {
        BigDecimal revenue = orderRepository.getTotalRevenueBetween(startDate, endDate);
        return revenue != null ? revenue : BigDecimal.ZERO;
    }

    public Long countOrdersByStatus(OrderStatus status) {
        return orderRepository.countByStatus(status);
    }

    private OrderDto mapToDto(Order order) {
        List<OrderItemDto> orderItemDtos = order.getItems().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return OrderDto.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .username(order.getUser().getUsername())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .shippingAddress(order.getShippingAddress())
                .billingAddress(order.getBillingAddress())
                .phoneNumber(order.getPhoneNumber())
                .paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus())
                .trackingNumber(order.getTrackingNumber())
                .deliveryDate(order.getDeliveryDate())
                .updatedAt(order.getUpdatedAt())
                .items(orderItemDtos)
                .notes(order.getNotes())
                .build();
    }

    public Page<OrderDto> getOrdersByUserAndStatus(String username, OrderStatus status, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Page<Order> orders = orderRepository.findByUserAndStatus(user, status, pageable);
        return orders.map(this::mapToDto);
    }

    private OrderItemDto mapToDto(OrderItem orderItem) {
        return OrderItemDto.builder()
                .id(orderItem.getId())
                .productId(orderItem.getProduct().getId())
                .productName(orderItem.getProduct().getName())
                .quantity(orderItem.getQuantity())
                .unitPrice(orderItem.getUnitPrice())
                .subtotal(orderItem.getSubtotal())
                .productImageUrl(orderItem.getProduct().getImageUrl())
                .build();
    }
}