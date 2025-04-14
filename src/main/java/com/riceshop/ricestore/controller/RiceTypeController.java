package com.riceshop.ricestore.controller;

import com.riceshop.ricestore.dto.RiceTypeDto;
import com.riceshop.ricestore.dto.request.RiceTypeRequest;
import com.riceshop.ricestore.dto.response.BaseResponse;
import com.riceshop.ricestore.dto.response.MessageResponse;
import com.riceshop.ricestore.service.RiceTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rice-types")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RiceTypeController {
    @Autowired
    private RiceTypeService riceTypeService;

    @GetMapping
    public ResponseEntity<BaseResponse<List<RiceTypeDto>>> getAllRiceTypes(
            @RequestParam(defaultValue = "true") boolean activeOnly) {
        List<RiceTypeDto> riceTypes;
        if (activeOnly) {
            riceTypes = riceTypeService.getActiveRiceTypes();
        } else {
            riceTypes = riceTypeService.getAllRiceTypes();
        }
        return ResponseEntity.ok(BaseResponse.success(riceTypes, "Rice types retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<RiceTypeDto>> getRiceTypeById(@PathVariable Long id) {
        RiceTypeDto riceType = riceTypeService.getRiceTypeById(id);
        return ResponseEntity.ok(BaseResponse.success(riceType, "Rice type retrieved successfully"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<RiceTypeDto>> createRiceType(@Valid @RequestBody RiceTypeRequest request) {
        RiceTypeDto createdRiceType = riceTypeService.createRiceType(request);
        return new ResponseEntity<>(
                BaseResponse.success(createdRiceType, "Rice type created successfully"),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<RiceTypeDto>> updateRiceType(
            @PathVariable Long id,
            @Valid @RequestBody RiceTypeRequest request) {
        RiceTypeDto updatedRiceType = riceTypeService.updateRiceType(id, request);
        return ResponseEntity.ok(BaseResponse.success(updatedRiceType, "Rice type updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<MessageResponse>> deleteRiceType(@PathVariable Long id) {
        riceTypeService.deleteRiceType(id);
        return ResponseEntity.ok(BaseResponse.success(
                new MessageResponse("Rice type deleted successfully"),
                "Rice type deleted successfully"));
    }

    @PutMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<RiceTypeDto>> activateRiceType(@PathVariable Long id) {
        RiceTypeDto activatedRiceType = riceTypeService.activateRiceType(id);
        return ResponseEntity.ok(BaseResponse.success(activatedRiceType, "Rice type activated successfully"));
    }
}