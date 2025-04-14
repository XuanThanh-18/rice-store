package com.riceshop.ricestore.repository;

import com.riceshop.ricestore.entity.RiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RiceTypeRepository extends JpaRepository<RiceType, Long> {
    Optional<RiceType> findByName(String name);
    List<RiceType> findByIsActiveTrue();
    Boolean existsByName(String name);
}