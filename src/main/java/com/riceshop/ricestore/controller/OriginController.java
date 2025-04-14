package com.riceshop.ricestore.controller;

import com.riceshop.ricestore.dto.OriginDto;
import com.riceshop.ricestore.dto.request.OriginRequest;
import com.riceshop.ricestore.dto.response.BaseResponse;
import com.riceshop.ricestore.dto.response.MessageResponse;
import com.riceshop.ricestore.service.OriginService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/origins")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OriginController {
    @Autowired
    private OriginService originService;

    @GetMapping
    public ResponseEntity<BaseResponse<List<OriginDto>>> getAllOrigins(
            @RequestParam(defaultValue = "true") boolean activeOnly) {
        List<OriginDto> origins;
        if (activeOnly) {
            origins = originService.getActiveOrigins();
        } else {
            origins = originService.getAllOrigins();
        }
        return ResponseEntity.ok(BaseResponse.success(origins, "Origins retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<OriginDto>> getOriginById(@PathVariable Long id) {
        OriginDto origin = originService.getOriginById(id);
        return ResponseEntity.ok(BaseResponse.success(origin, "Origin retrieved successfully"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<OriginDto>> createOrigin(@Valid @RequestBody OriginRequest request) {
        OriginDto createdOrigin = originService.createOrigin(request);
        return new ResponseEntity<>(
                BaseResponse.success(createdOrigin, "Origin created successfully"),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<OriginDto>> updateOrigin(
            @PathVariable Long id,
            @Valid @RequestBody OriginRequest request) {
        OriginDto updatedOrigin = originService.updateOrigin(id, request);
        return ResponseEntity.ok(BaseResponse.success(updatedOrigin, "Origin updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<MessageResponse>> deleteOrigin(@PathVariable Long id) {
        originService.deleteOrigin(id);
        return ResponseEntity.ok(BaseResponse.success(
                new MessageResponse("Origin deleted successfully"),
                "Origin deleted successfully"));
    }

    @PutMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BaseResponse<OriginDto>> activateOrigin(@PathVariable Long id) {
        OriginDto activatedOrigin = originService.activateOrigin(id);
        return ResponseEntity.ok(BaseResponse.success(activatedOrigin, "Origin activated successfully"));
    }
}