package com.example.server.dto.CalendarDTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;


@Getter
@Setter
public class AppointmentDTO {
    public LocalTime start;
    public LocalTime end;
    public String status;

    public AppointmentDTO(LocalTime start, LocalTime end, String status, PatientCalendarDTO patient, String comment) {
        this.start = start;
        this.end = end;
        this.status = status;
        this.patient = patient;
        this.comment = comment;
    }

    private PatientCalendarDTO patient;

    private String comment;


}