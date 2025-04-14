package com.riceshop.ricestore.service;

import com.riceshop.ricestore.dto.RiceTypeDto;
import com.riceshop.ricestore.dto.request.RiceTypeRequest;
import com.riceshop.ricestore.entity.RiceType;
import com.riceshop.ricestore.exception.BadRequestException;
import com.riceshop.ricestore.exception.ResourceNotFoundException;
import com.riceshop.ricestore.repository.RiceTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RiceTypeService {
    @Autowired
    private RiceTypeRepository riceTypeRepository;

    public List<RiceTypeDto> getAllRiceTypes() {
        List<RiceType> riceTypes = riceTypeRepository.findAll();
        return riceTypes.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<RiceTypeDto> getActiveRiceTypes() {
        List<RiceType> riceTypes = riceTypeRepository.findByIsActiveTrue();
        return riceTypes.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public RiceTypeDto getRiceTypeById(Long id) {
        RiceType riceType = riceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rice type not found with id: " + id));
        return mapToDto(riceType);
    }

    @Transactional
    public RiceTypeDto createRiceType(RiceTypeRequest request) {
        // Check if rice type with the same name already exists
        if (riceTypeRepository.existsByName(request.getName())) {
            throw new BadRequestException("Rice type with name '" + request.getName() + "' already exists");
        }

        RiceType riceType = new RiceType();
        riceType.setName(request.getName());
        riceType.setDescription(request.getDescription());
        riceType.setIsActive(true);

        RiceType savedRiceType = riceTypeRepository.save(riceType);
        return mapToDto(savedRiceType);
    }

    @Transactional
    public RiceTypeDto updateRiceType(Long id, RiceTypeRequest request) {
        RiceType riceType = riceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rice type not found with id: " + id));

        // Check if name is changed and if it conflicts with existing name
        if (!riceType.getName().equals(request.getName()) && riceTypeRepository.existsByName(request.getName())) {
            throw new BadRequestException("Rice type with name '" + request.getName() + "' already exists");
        }

        riceType.setName(request.getName());
        riceType.setDescription(request.getDescription());

        RiceType updatedRiceType = riceTypeRepository.save(riceType);
        return mapToDto(updatedRiceType);
    }

    @Transactional
    public void deleteRiceType(Long id) {
        RiceType riceType = riceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rice type not found with id: " + id));

        // Soft delete
        riceType.setIsActive(false);
        riceTypeRepository.save(riceType);
    }

    @Transactional
    public RiceTypeDto activateRiceType(Long id) {
        RiceType riceType = riceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rice type not found with id: " + id));

        riceType.setIsActive(true);
        RiceType activatedRiceType = riceTypeRepository.save(riceType);
        return mapToDto(activatedRiceType);
    }

    private RiceTypeDto mapToDto(RiceType riceType) {
        return RiceTypeDto.builder()
                .id(riceType.getId())
                .name(riceType.getName())
                .description(riceType.getDescription())
                .createdAt(riceType.getCreatedAt())
                .updatedAt(riceType.getUpdatedAt())
                .isActive(riceType.getIsActive())
                .build();
    }
}