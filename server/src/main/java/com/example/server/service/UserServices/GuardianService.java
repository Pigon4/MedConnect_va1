package com.example.server.service.UserServices;

import com.example.server.models.UserModels.Guardian;
import com.example.server.repository.StorageRepositories.StorageRepository;
import com.example.server.repository.UserRepositories.GuardianRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class GuardianService extends BaseUserServiceImpl<Guardian> {
    public GuardianService(GuardianRepository guardianRepository, PasswordEncoder passwordEncoder, StorageRepository storageRepository) {
        super(guardianRepository, passwordEncoder,storageRepository);
    }
}