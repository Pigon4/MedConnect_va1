package com.example.server.config;

import com.example.server.models.Role;
import com.example.server.models.RolesEnum;
import com.example.server.models.User;
import com.example.server.repository.RoleRepository;
import com.example.server.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {

            // --- Seed roles ---
            if (roleRepository.count() == 0) {
                Role admin = new Role();
                admin.setId(1);
                admin.setRole(RolesEnum.Admin);

                Role doctor = new Role();
                doctor.setId(2);
                doctor.setRole(RolesEnum.Doctor);

                Role patient = new Role();
                patient.setId(3);
                patient.setRole(RolesEnum.Patient);

                roleRepository.saveAll(Set.of(admin, doctor, patient));
                System.out.println("✅ Roles seeded successfully!");
            }

            // --- Seed users ---
            if (userRepository.count() == 0) {
                Role adminRole = roleRepository.findByRole(RolesEnum.Admin);
                Role doctorRole = roleRepository.findByRole(RolesEnum.Doctor);
                Role patientRole = roleRepository.findByRole(RolesEnum.Patient);

                User user1 = new User();
                user1.setUsername("murtveca");
                user1.setPassword("gooner");
                user1.setName("Murt Veca");
                user1.setAge(24);
                user1.setPhoneNumber("123456789");
                user1.setRoles(Set.of(adminRole, doctorRole));

                User user2 = new User();
                user2.setUsername("john_doe");
                user2.setPassword("password123");
                user2.setName("John Doe");
                user2.setAge(30);
                user2.setPhoneNumber("987654321");
                user2.setRoles(Set.of(patientRole));

                userRepository.saveAll(Set.of(user1, user2));
                System.out.println("✅ Users seeded successfully!");
            }
        };
    }
}
