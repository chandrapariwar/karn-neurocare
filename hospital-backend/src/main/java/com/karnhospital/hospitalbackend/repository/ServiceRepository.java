package com.karnhospital.hospitalbackend.repository;

import com.karnhospital.hospitalbackend.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    // JpaRepository automatically save, findAll, delete, findById deta hai
}