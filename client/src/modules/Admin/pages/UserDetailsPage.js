import { useParams } from "react-router-dom";
import { usersMock } from "../mock data/Users";
import { pendingDoctorsMock } from "../mock data/PendingDoctors";

import PersonalInformation from "../../../features/dashboards/patient/pages/PersonalInformation";
import DoctorPersonalInformation from "../../../features/doctors/DoctorPersonalInformation";

const UserDetailsPage = () => {
  const { id } = useParams();
  const userId = Number(id);

  // Първо проверяваме дали е непотвърден лекар
  const pendingDoctor = pendingDoctorsMock.find(d => d.id === userId);
  if (pendingDoctor) {
    return (
      <div>
        <h2>Детайли за лекар</h2>
        <DoctorPersonalInformation user={pendingDoctor} readOnly={true} />
      </div>
    );
  }

  // Ако не е непотвърден лекар, търсим в usersMock
  const user = usersMock.find(u => u.id === userId);
  if (!user) return <p>Потребителят не е намерен.</p>;

  const isDoctor = user.roles?.includes("DOCTOR");
  const isPatientOrGuardian =
    user.roles?.includes("PATIENT") || user.roles?.includes("GUARDIAN");

  return (
    <div>
      <h2>Детайли за потребител</h2>
      {isPatientOrGuardian && <PersonalInformation user={user} readOnly={true} />}
      {isDoctor && <DoctorPersonalInformation user={user} readOnly={false} />}
    </div>
  );
};

export default UserDetailsPage;
