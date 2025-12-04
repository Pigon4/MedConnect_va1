package com.example.server.dto.CalendarDTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class WorkDayExceptionDTO {


    private LocalDate date;

    private Boolean working;

    private LocalTime overrideStartTime;
    private LocalTime overrideEndTime;

    @Override
    public String toString() {
        return "WorkDayExceptionDTO{" +
                "date=" + date +
                ", working=" + working +
                ", overrideStartTime=" + overrideStartTime +
                ", overrideEndTime=" + overrideEndTime +
                '}';
    }
}
