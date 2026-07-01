package com.karnhospital.hospitalbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.karnhospital.hospitalbackend.entity.Service;
import com.karnhospital.hospitalbackend.repository.ServiceRepository;

@Component
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Service getServiceById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    // ✅ NAYA: Save/Update service
    public Service saveService(Service service) {
        return serviceRepository.save(service);
    }

    // ✅ NAYA: Delete service
    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}