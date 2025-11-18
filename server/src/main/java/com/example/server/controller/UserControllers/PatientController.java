package com.example.server.controller.UserControllers;

import com.example.server.models.Patient;
import com.example.server.models.User;
import com.example.server.service.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/user/patient")
@RestController
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody Patient patient) {

        try {
            patientService.saveUser(patient);
            return new ResponseEntity<>(patient, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/subscription")
    public ResponseEntity<?> getUserSubscription(@RequestParam String email) {
        User user = patientService.getUserByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
        }

        Map<String, String> response = new HashMap<>();

        response.put("subscriptionStatus", user.getSubscription());
        response.put("subscriptionType", user.getSubscriptionType());

        return ResponseEntity.ok(response);

    }

}
