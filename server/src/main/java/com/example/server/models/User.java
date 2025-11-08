package com.example.server.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
//import lombok.Getter;
//import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    private String username;
    private String password;
    private int age;
    private String phoneNumber;
    private String name;
//
    @ManyToMany(cascade = CascadeType.ALL) // this side is inverse
    private Set<Role> roles;


//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }





}

