package com.karnhospital.hospitalbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karnhospital.hospitalbackend.entity.Speciality;
import com.karnhospital.hospitalbackend.service.SpecialityService;

@RestController
@RequestMapping("/api/specialities")
@CrossOrigin(origins = "http://localhost:3000") // Frontend port
public class SpecialityController {

    @Autowired
    private SpecialityService specialityService;

    @GetMapping
    public List<Speciality> getAllSpecialities() {
        return specialityService.getAllSpecialities();
    }
}