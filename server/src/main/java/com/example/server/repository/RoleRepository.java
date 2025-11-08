package com.example.server.repository;

import com.example.server.models.Role;
import com.example.server.models.RolesEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Integer> {

    Role findByRole (RolesEnum role);


}
