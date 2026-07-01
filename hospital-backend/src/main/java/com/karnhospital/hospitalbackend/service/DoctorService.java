package com.karnhospital.hospitalbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.karnhospital.hospitalbackend.entity.Doctor;
import com.karnhospital.hospitalbackend.repository.DoctorRepository;

@Component
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    // ✅ NAYA: Save/Update doctor
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // ✅ NAYA: Delete doctor
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}