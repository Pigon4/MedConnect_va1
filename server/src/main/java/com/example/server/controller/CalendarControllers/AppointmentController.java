package com.example.server.controller.CalendarControllers;

import com.example.server.dto.CalendarDTO.AppointmentCreateDTO;
import com.example.server.dto.CalendarDTO.AppointmentFilterDTO;
import com.example.server.models.CalendarModels.Appointment;
import com.example.server.service.CalendarServices.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentCreateDTO dto) {

        try {
            Appointment appt = service.createAppointment(dto);
            return ResponseEntity.ok(appt);

        } catch (Exception e) {
            // Create a response with the error message and status BAD_REQUEST (400)
            // You can structure the error response as an object with message and details
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)  // HTTP status 400
                    .body(e.getMessage());
        }
    }

    @GetMapping("/doctor")
    public List<Appointment> getDoctorAppointments(@RequestParam Long doctorId,
                                                   @RequestParam Appointment.Status status) {
        return service.getDoctorAppointments(doctorId, status);
    }

    @GetMapping("/pastUserAppointments")
    public List<Appointment> getPastUserAppointments(@RequestParam Long doctorId,
                                                     @RequestParam Appointment.Status status,
                                                     @RequestParam Long patientId) {
        return service.getDoctorAppointmentToUser(doctorId, status, patientId);
    }

    @PatchMapping("/{id}/feedback")
    public ResponseEntity<?> updateFeedback(
            @PathVariable Long id,
            @RequestBody String feedback
    ) {
        service.updateFeedback(id, feedback);
        return ResponseEntity.ok("Feedback updated");
    }


}
