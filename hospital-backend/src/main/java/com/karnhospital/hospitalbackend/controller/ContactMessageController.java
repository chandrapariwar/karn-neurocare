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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karnhospital.hospitalbackend.entity.ContactMessage;
import com.karnhospital.hospitalbackend.service.ContactMessageService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactMessageController {

    @Autowired
    private ContactMessageService contactMessageService;

    @PostMapping
    public ResponseEntity<?> submitContactForm(@RequestBody ContactMessage message) {
        try {
            ContactMessage savedMessage = contactMessageService.saveMessage(message);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Thank you! We will contact you soon.",
                "data", savedMessage
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to send message. Please try again."
            ));
        }
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return contactMessageService.getAllMessages();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        ContactMessage existing = contactMessageService.getMessageById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        contactMessageService.deleteMessage(id);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Message deleted successfully!"
        ));
    }
}