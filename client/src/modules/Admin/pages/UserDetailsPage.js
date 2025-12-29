import { useParams } from "react-router-dom";
import { usersMock } from "../mock data/Users";
import PersonalInformation from "../../../features/dashboards/patient/pages/PersonalInformation";
import DoctorPersonalInformation from "../../../features/doctors/DoctorPersonalInformation";

const UserDetailsPage = () => {
  const { id } = useParams();
  const user = usersMock.find((u) => u.id === parseInt(id));

  if (!user) return <p>Потребителят не е намерен.</p>;

  const isPatientOrGuardian = user.roles.includes("PATIENT") || user.roles.includes("GUARDIAN");
  const isDoctor = user.roles.includes("DOCTOR");

  return (
    <div>
      <h2>Детайли за потребител</h2>
      {isPatientOrGuardian && (
        <PersonalInformation user={user} readOnly={true} />
      )}
      {isDoctor && <DoctorPersonalInformation user={user} />}
    </div>
  );
};

export default UserDetailsPage;
