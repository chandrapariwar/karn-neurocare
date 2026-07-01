package com.karnhospital.hospitalbackend.controller;

import com.karnhospital.hospitalbackend.entity.Appointment;
import com.karnhospital.hospitalbackend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Naya appointment book karna
    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        try {
            Appointment savedAppointment = appointmentService.bookAppointment(appointment);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Appointment booked successfully! We will confirm shortly.",
                "appointmentId", savedAppointment.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to book appointment. Please try again."
            ));
        }
    }

    // Saare appointments dekhna
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // Ek appointment dekhna
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    // ✅ NAYA: Status update karna (Confirm/Cancel)
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        
        if (appointment == null) {
            return ResponseEntity.notFound().build();
        }

        // Status update karo
        appointment.setStatus(request.get("status"));
        appointmentService.saveAppointment(appointment);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Status updated successfully!"
        ));
    }
}