package com.riceshop.ricestore.service;

import com.riceshop.ricestore.dto.ProductDto;
import com.riceshop.ricestore.dto.request.ProductRequest;
import com.riceshop.ricestore.entity.User;
import com.riceshop.ricestore.entity.enums.Product;
import com.riceshop.ricestore.exception.ResourceNotFoundException;
import com.riceshop.ricestore.repository.ProductRepository;
import com.riceshop.ricestore.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<ProductDto> getAllProducts(String keyword, String riceType, String origin,
                                           BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        Page<Product> products = productRepository.findProductsWithFilter(
                keyword, riceType, origin, minPrice, maxPrice, pageable);

        return products.map(this::mapToDto);
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        return mapToDto(product);
    }

    @Transactional
    public ProductDto createProduct(ProductRequest productRequest, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setStockQuantity(productRequest.getStockQuantity());
        product.setImageUrl(productRequest.getImageUrl());
        product.setOrigin(productRequest.getOrigin());
        product.setRiceType(productRequest.getRiceType());
        product.setWeight(productRequest.getWeight());
        product.setCreatedBy(user);
        product.setIsActive(true);

        Product savedProduct = productRepository.save(product);

        return mapToDto(savedProduct);
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductRequest productRequest) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setStockQuantity(productRequest.getStockQuantity());
        product.setImageUrl(productRequest.getImageUrl());
        product.setOrigin(productRequest.getOrigin());
        product.setRiceType(productRequest.getRiceType());
        product.setWeight(productRequest.getWeight());

        Product updatedProduct = productRepository.save(product);

        return mapToDto(updatedProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        // Soft delete
        product.setIsActive(false);
        productRepository.save(product);
    }

    private ProductDto mapToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .imageUrl(product.getImageUrl())
                .origin(product.getOrigin())
                .riceType(product.getRiceType())
                .weight(product.getWeight())
                .createdAt(product.getCreatedAt())
                .createdBy(product.getCreatedBy() != null ? product.getCreatedBy().getUsername() : null)
                .isActive(product.getIsActive())
                .build();
    }
}
