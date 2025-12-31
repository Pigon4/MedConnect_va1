import React from "react";
import AppointmentsCalendar from "../AppointmentsCalendar";
import { appointmentsMock }  from "../mock data/Appointments";

const AppointmentsPage = () => {
  return (
    <div>
      <h2 className="text-center my-4">Календар на прегледите</h2>
      <AppointmentsCalendar appointments={appointmentsMock} />
    </div>
  );
};

export default AppointmentsPage;
