package com.karnhospital.hospitalbackend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karnhospital.hospitalbackend.entity.Service;
import com.karnhospital.hospitalbackend.service.ServiceService;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping
    public List<Service> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{id}")
    public Service getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id);
    }

    // ✅ NAYA: Naya service add karna
    @PostMapping
    public ResponseEntity<?> addService(@RequestBody Service service) {
        try {
            Service savedService = serviceService.saveService(service);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Service added successfully!",
                "data", savedService
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to add service: " + e.getMessage()
            ));
        }
    }

    // ✅ NAYA: Service update karna
    @PutMapping("/{id}")
    public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody Service service) {
        Service existing = serviceService.getServiceById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        
        existing.setName(service.getName());
        existing.setDescription(service.getDescription());
        existing.setIcon(service.getIcon());
        existing.setPrice(service.getPrice());
        
        Service updated = serviceService.saveService(existing);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Service updated successfully!",
            "data", updated
        ));
    }

    // ✅ NAYA: Service delete karna
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        Service existing = serviceService.getServiceById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        serviceService.deleteService(id);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Service deleted successfully!"
        ));
    }
}