package com.riceshop.ricestore.service;

import com.riceshop.ricestore.dto.OriginDto;
import com.riceshop.ricestore.dto.request.OriginRequest;
import com.riceshop.ricestore.entity.Origin;
import com.riceshop.ricestore.exception.BadRequestException;
import com.riceshop.ricestore.exception.ResourceNotFoundException;
import com.riceshop.ricestore.repository.OriginRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OriginService {
    @Autowired
    private OriginRepository originRepository;

    public List<OriginDto> getAllOrigins() {
        List<Origin> origins = originRepository.findAll();
        return origins.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<OriginDto> getActiveOrigins() {
        List<Origin> origins = originRepository.findByIsActiveTrue();
        return origins.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public OriginDto getOriginById(Long id) {
        Origin origin = originRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Origin not found with id: " + id));
        return mapToDto(origin);
    }

    @Transactional
    public OriginDto createOrigin(OriginRequest request) {
        // Check if origin with the same name already exists
        if (originRepository.existsByName(request.getName())) {
            throw new BadRequestException("Origin with name '" + request.getName() + "' already exists");
        }

        Origin origin = new Origin();
        origin.setName(request.getName());
        origin.setDescription(request.getDescription());
        origin.setCountryCode(request.getCountryCode());
        origin.setIsActive(true);

        Origin savedOrigin = originRepository.save(origin);
        return mapToDto(savedOrigin);
    }

    @Transactional
    public OriginDto updateOrigin(Long id, OriginRequest request) {
        Origin origin = originRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Origin not found with id: " + id));

        // Check if name is changed and if it conflicts with existing name
        if (!origin.getName().equals(request.getName()) && originRepository.existsByName(request.getName())) {
            throw new BadRequestException("Origin with name '" + request.getName() + "' already exists");
        }

        origin.setName(request.getName());
        origin.setDescription(request.getDescription());
        origin.setCountryCode(request.getCountryCode());

        Origin updatedOrigin = originRepository.save(origin);
        return mapToDto(updatedOrigin);
    }

    @Transactional
    public void deleteOrigin(Long id) {
        Origin origin = originRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Origin not found with id: " + id));

        // Soft delete
        origin.setIsActive(false);
        originRepository.save(origin);
    }

    @Transactional
    public OriginDto activateOrigin(Long id) {
        Origin origin = originRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Origin not found with id: " + id));

        origin.setIsActive(true);
        Origin activatedOrigin = originRepository.save(origin);
        return mapToDto(activatedOrigin);
    }

    private OriginDto mapToDto(Origin origin) {
        return OriginDto.builder()
                .id(origin.getId())
                .name(origin.getName())
                .description(origin.getDescription())
                .countryCode(origin.getCountryCode())
                .createdAt(origin.getCreatedAt())
                .updatedAt(origin.getUpdatedAt())
                .isActive(origin.getIsActive())
                .build();
    }
}