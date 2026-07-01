package com.karnhospital.hospitalbackend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.karnhospital.hospitalbackend.entity.ContactMessage;
import com.karnhospital.hospitalbackend.repository.ContactMessageRepository;

@Component
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    public ContactMessage saveMessage(ContactMessage message) {
        message.setCreatedAt(LocalDateTime.now());
        return contactMessageRepository.save(message);
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    public ContactMessage getMessageById(Long id) {
        return contactMessageRepository.findById(id).orElse(null);
    }

    public void deleteMessage(Long id) {
        contactMessageRepository.deleteById(id);
    }
}