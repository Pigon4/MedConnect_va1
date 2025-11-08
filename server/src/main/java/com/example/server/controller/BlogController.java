package com.example.server.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("api/v1/blog")
@RequestMapping("api/blog")
public class BlogController {


    @GetMapping("/unrestricted")
    public ResponseEntity<?> getMessage() {
        return ResponseEntity.status(HttpStatus.OK)
                .body("{\"message\": \"This is a normal message\"}");
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/restricted")
    public ResponseEntity<?> getRestrictedMessage() {
        return ResponseEntity.status(HttpStatus.OK)
                .body("{\"message\": \"This is a RESTRICTED message\"}");
    }


}
