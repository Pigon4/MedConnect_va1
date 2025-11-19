package com.example.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
// @NoArgsConstructor
// @AllArgsConstructor
@Table(name = "guardian")
public class Guardian extends User {

    private String wardFirstName;

    private String wardLastName;

    private int wardAge;

    private Boolean isWardDisabled;

    private String wardDisabilityDescription;

    private String wardAllergies;

    private String wardDiseases;
}
