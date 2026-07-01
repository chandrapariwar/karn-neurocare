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

import com.karnhospital.hospitalbackend.entity.Doctor;
import com.karnhospital.hospitalbackend.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    // ✅ NAYA: Naya doctor add karna
    @PostMapping
    public ResponseEntity<?> addDoctor(@RequestBody Doctor doctor) {
        try {
            Doctor savedDoctor = doctorService.saveDoctor(doctor);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Doctor added successfully!",
                "data", savedDoctor
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to add doctor: " + e.getMessage()
            ));
        }
    }

    // ✅ NAYA: Doctor update karna
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
        Doctor existing = doctorService.getDoctorById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Existing doctor ke fields update karo
        existing.setName(doctor.getName());
        existing.setDepartment(doctor.getDepartment());
        existing.setQualification(doctor.getQualification());
        existing.setExperience(doctor.getExperience());
        existing.setPhone(doctor.getPhone());
        existing.setImageUrl(doctor.getImageUrl());
        
        Doctor updated = doctorService.saveDoctor(existing);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Doctor updated successfully!",
            "data", updated
        ));
    }

    // ✅ NAYA: Doctor delete karna
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        Doctor existing = doctorService.getDoctorById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Doctor deleted successfully!"
        ));
    }
}