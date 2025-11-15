import { Button, Image, Table } from "react-bootstrap";
import { FileDown, FileText, Printer } from "lucide-react";
import { useEffect, useState } from "react";

// Импортиране на всички изображения от src/images
const importAllImages = (r) =>
  r.keys().map((key, idx) => ({
    id: idx + 1,
    name: key.replace("./", ""),
    type: "image/jpeg", // или определете MIME ако е нужно
    size: 100000, // примерно 100 KB
    date: "15.11.2025",
    content: r(key),
  }));

const PatientDetails = ({ patient, onBack }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Импортираме всички изображения динамично
    const imageFiles = importAllImages(
      require.context("../../images", false, /\.(png|jpe?g|gif)$/)
    );
    setFiles(imageFiles);

    // Ако има нещо в localStorage, можеш да го обединиш
    const saved = localStorage.getItem("patient_files");
    if (saved) {
      const savedFiles = JSON.parse(saved);
      setFiles((prev) => [...prev, ...savedFiles]);
    }
  }, []);

  const handleDownload = (file) => {
    if (!file.content) return;
    const link = document.createElement("a");
    link.href = file.content;
    link.download = file.name;
    link.click();
  };

  const handlePrint = async (file) => {
    try {
      let fileURL = file.content;

      if (!fileURL && file.rawFile) {
        fileURL = URL.createObjectURL(file.rawFile);
      }

      if (!fileURL) return;

      const win = window.open(fileURL, "_blank");
      win?.focus();
      win?.print();
    } catch (err) {
      console.error("Не може да се принтира:", err);
    }
  };

  const isPreviewable = (type) =>
    type.startsWith("image/") || type === "application/pdf";

  return (
    <div>
      <Button variant="secondary" onClick={onBack} className="mb-3">
        ← Назад към търсачката
      </Button>

      <div className="p-4 bg-light rounded shadow-sm mb-4 d-flex align-items-center">
        <Image
          src={patient.photo}
          alt={patient.fname + " " + patient.lname}
          rounded
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
            marginRight: "20px",
            borderRadius: "10px",
            border: "3px solid #2E8B57",
            backgroundColor: "#f8f9fa",
          }}
        />
        <div>
          <h4>{patient.fname + " " + patient.lname}</h4>
          <p>{patient.age} години</p>
          <p>🦠 Алергии: {patient.allergies}</p>
          <p>🚑 Заболявания: {patient.diseases}</p>
          <p>♿ Увреждания: {patient.disabilities}</p>
          <p>
            📞 Контакти:
            <br />
            {patient.email}
            <br />
            {patient.phone}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h5>📁 Документи на пациента</h5>

        {files.length === 0 ? (
          <p>Няма качени документи.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Име</th>
                <th>Тип</th>
                <th>Размер</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>

            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>{file.name}</td>
                  <td>{file.type}</td>
                  <td>{(file.size / 1024).toFixed(2)} KB</td>
                  <td>{file.date}</td>

                  <td className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleDownload(file)}
                      title="Изтегли"
                    >
                      <FileDown size={16} />
                    </Button>

                    {isPreviewable(file.type) && (
                      <>
                        <Button
                          variant="outline-secondary"
                          onClick={() => window.open(file.content, "_blank")}
                          title="Преглед"
                        >
                          <FileText size={16} />
                        </Button>

                        <Button
                          variant="outline-success"
                          onClick={() => handlePrint(file)}
                          title="Принтирай"
                        >
                          <Printer size={16} />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
