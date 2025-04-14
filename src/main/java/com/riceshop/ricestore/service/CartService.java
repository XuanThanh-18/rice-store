package com.riceshop.ricestore.service;

import com.riceshop.ricestore.dto.CartDto;
import com.riceshop.ricestore.dto.CartItemDto;
import com.riceshop.ricestore.dto.request.AddToCartRequest;
import com.riceshop.ricestore.dto.request.UpdateCartItemRequest;
import com.riceshop.ricestore.entity.Cart;
import com.riceshop.ricestore.entity.CartItem;
import com.riceshop.ricestore.entity.Product;
import com.riceshop.ricestore.entity.User;
import com.riceshop.ricestore.exception.BadRequestException;
import com.riceshop.ricestore.exception.ResourceNotFoundException;
import com.riceshop.ricestore.repository.CartItemRepository;
import com.riceshop.ricestore.repository.CartRepository;
import com.riceshop.ricestore.repository.ProductRepository;
import com.riceshop.ricestore.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public CartDto getCartByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        return mapToDto(cart);
    }

    @Transactional
    public CartDto addToCart(String username, AddToCartRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + request.getProductId()));

        // Check if product is active
        if (!product.getIsActive()) {
            throw new BadRequestException("Product is not available");
        }

        // Check if quantity is available
        if (product.getStockQuantity() < request.getQuantity()) {
            throw new BadRequestException("Requested quantity exceeds available stock");
        }

        // Get or create cart
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        // Check if item already exists in cart
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setCart(cart);
                    newItem.setProduct(product);
                    newItem.setQuantity(0);
                    newItem.setUnitPrice(product.getPrice());
                    newItem.setSubtotal(BigDecimal.ZERO);
                    return newItem;
                });

        // Update quantity and subtotal
        cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        cartItem.calculateSubtotal();
        cartItemRepository.save(cartItem);

        // Recalculate cart total
        cart.recalculateTotal();
        cartRepository.save(cart);

        return mapToDto(cart);
    }

    @Transactional
    public CartDto updateCartItem(String username, Long cartItemId, UpdateCartItemRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + username));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        // Validate that the cart item belongs to the user's cart
        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Cart item does not belong to user's cart");
        }

        // Check if product is still active
        Product product = cartItem.getProduct();
        if (!product.getIsActive()) {
            throw new BadRequestException("Product is not available");
        }

        // Check if quantity is available
        if (product.getStockQuantity() < request.getQuantity()) {
            throw new BadRequestException("Requested quantity exceeds available stock");
        }

        // Update quantity and subtotal
        cartItem.setQuantity(request.getQuantity());
        cartItem.calculateSubtotal();
        cartItemRepository.save(cartItem);

        // Recalculate cart total
        cart.recalculateTotal();
        cartRepository.save(cart);

        return mapToDto(cart);
    }

    @Transactional
    public CartDto removeFromCart(String username, Long cartItemId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + username));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        // Validate that the cart item belongs to the user's cart
        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Cart item does not belong to user's cart");
        }

        // Remove item from cart
        cartItemRepository.delete(cartItem);

        // Recalculate cart total
        cart.getCartItems().remove(cartItem);
        cart.recalculateTotal();
        cartRepository.save(cart);

        return mapToDto(cart);
    }

    @Transactional
    public void clearCart(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + username));

        // Delete all cart items
        List<CartItem> cartItems = cart.getCartItems();
        cartItemRepository.deleteAll(cartItems);

        // Clear cart items list and reset total
        cartItems.clear();
        cart.setTotalAmount(BigDecimal.ZERO);
        cartRepository.save(cart);
    }

    private CartDto mapToDto(Cart cart) {
        List<CartItemDto> cartItemDtos = cart.getCartItems().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return CartDto.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .username(cart.getUser().getUsername())
                .totalAmount(cart.getTotalAmount())
                .items(cartItemDtos)
                .updatedAt(cart.getUpdatedAt())
                .build();
    }

    private CartItemDto mapToDto(CartItem cartItem) {
        return CartItemDto.builder()
                .id(cartItem.getId())
                .productId(cartItem.getProduct().getId())
                .productName(cartItem.getProduct().getName())
                .quantity(cartItem.getQuantity())
                .unitPrice(cartItem.getUnitPrice())
                .subtotal(cartItem.getSubtotal())
                .imageUrl(cartItem.getProduct().getImageUrl())
                .build();
    }
}