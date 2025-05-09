package com.riceshop.ricestore.repository;

import com.riceshop.ricestore.entity.Cart;
import com.riceshop.ricestore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}