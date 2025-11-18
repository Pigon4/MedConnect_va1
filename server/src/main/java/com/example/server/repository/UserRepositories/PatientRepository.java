package com.example.server.repository.UserRepositories;

import com.example.server.models.Patient;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends BaseUserRepository<Patient> {

}
