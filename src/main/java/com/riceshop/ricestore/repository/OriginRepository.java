package com.riceshop.ricestore.repository;

import com.riceshop.ricestore.entity.Origin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OriginRepository extends JpaRepository<Origin, Long> {
    Optional<Origin> findByName(String name);
    List<Origin> findByIsActiveTrue();
    Boolean existsByName(String name);
}