package com.example.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    private int id;

    @Enumerated(EnumType.STRING)
    private RolesEnum role;

//    @ManyToMany(mappedBy = "roles")
//    private Set<User> users;   ;
}
