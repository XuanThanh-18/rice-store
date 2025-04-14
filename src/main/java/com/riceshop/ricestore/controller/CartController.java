package com.riceshop.ricestore.controller;

import com.riceshop.ricestore.dto.CartDto;
import com.riceshop.ricestore.dto.request.AddToCartRequest;
import com.riceshop.ricestore.dto.request.UpdateCartItemRequest;
import com.riceshop.ricestore.dto.response.BaseResponse;
import com.riceshop.ricestore.dto.response.MessageResponse;
import com.riceshop.ricestore.security.service.UserDetailsImpl;
import com.riceshop.ricestore.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<BaseResponse<CartDto>> getCart(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        CartDto cart = cartService.getCartByUsername(userDetails.getUsername());
        return ResponseEntity.ok(BaseResponse.success(cart, "Cart retrieved successfully"));
    }

    @PostMapping("/add")
    public ResponseEntity<BaseResponse<CartDto>> addToCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody AddToCartRequest request) {
        CartDto cart = cartService.addToCart(userDetails.getUsername(), request);
        return ResponseEntity.ok(BaseResponse.success(cart, "Item added to cart successfully"));
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<BaseResponse<CartDto>> updateCartItem(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long cartItemId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        CartDto cart = cartService.updateCartItem(userDetails.getUsername(), cartItemId, request);
        return ResponseEntity.ok(BaseResponse.success(cart, "Cart item updated successfully"));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<BaseResponse<CartDto>> removeFromCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long cartItemId) {
        CartDto cart = cartService.removeFromCart(userDetails.getUsername(), cartItemId);
        return ResponseEntity.ok(BaseResponse.success(cart, "Item removed from cart successfully"));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<BaseResponse<MessageResponse>> clearCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        cartService.clearCart(userDetails.getUsername());
        return ResponseEntity.ok(BaseResponse.success(
                new MessageResponse("Cart cleared successfully"),
                "Cart cleared successfully"));
    }
}