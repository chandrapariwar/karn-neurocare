package com.karnhospital.hospitalbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.karnhospital.hospitalbackend.entity.Speciality;
import com.karnhospital.hospitalbackend.repository.SpecialityRepository;

@Component
public class SpecialityService {

    @Autowired
    private SpecialityRepository specialityRepository;

    public List<Speciality> getAllSpecialities() {
        return specialityRepository.findAll();
    }
}