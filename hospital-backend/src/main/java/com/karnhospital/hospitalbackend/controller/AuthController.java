package com.karnhospital.hospitalbackend.controller;

import com.karnhospital.hospitalbackend.entity.AdminUser;
import com.karnhospital.hospitalbackend.repository.AdminUserRepository;
import com.karnhospital.hospitalbackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<AdminUser> userOpt = adminUserRepository.findByUsername(username);

        if (userOpt.isPresent()) {
            AdminUser user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("token", token);
                response.put("user", Map.of(
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "role", user.getRole()
                ));

                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(401).body(Map.of(
            "success", false,
            "message", "Invalid username or password"
        ));
    }

    // Register endpoint (for creating first admin)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String email = userData.get("email");
        String password = userData.get("password");

        // Check if user already exists
        if (adminUserRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Username already exists"
            ));
        }

        // Create new admin user
        AdminUser user = new AdminUser();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("ADMIN");

        adminUserRepository.save(user);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Admin user created successfully"
        ));
    }

    // Verify token endpoint
    @PostMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");

        try {
            String username = jwtUtil.extractUsername(token);
            Optional<AdminUser> userOpt = adminUserRepository.findByUsername(username);

            if (userOpt.isPresent() && jwtUtil.validateToken(token, username)) {
                AdminUser user = userOpt.get();
                return ResponseEntity.ok(Map.of(
                    "valid", true,
                    "user", Map.of(
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "role", user.getRole()
                    )
                ));
            }
        } catch (Exception e) {
            // Token invalid
        }

        return ResponseEntity.status(401).body(Map.of(
            "valid", false,
            "message", "Invalid or expired token"
        ));
    }
}