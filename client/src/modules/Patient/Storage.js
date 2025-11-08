import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { FileDown, FileText, Printer } from "lucide-react";

const Storage = () => {
  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem("patient_files");
    return saved ? JSON.parse(saved) : [];
  });

  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    localStorage.setItem("patient_files", JSON.stringify(files));
  }, [files]);

  const handleUpload = () => {
    if (!newFile) return;

    const fileEntry = {
      id: Date.now(),
      name: newFile.name,
      size: newFile.size,
      type: newFile.type,
      date: new Date().toLocaleDateString(),
      content: URL.createObjectURL(newFile),
    };

    setFiles([...files, fileEntry]);
    setNewFile(null);
  };

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.content;
    link.download = file.name;
    link.click();
  };

  const handlePrint = (file) => {
    const win = window.open(file.content, "_blank");
    win?.print();
  };

  const handleRemove = (fileId) => {
    setFiles(files.filter((f) => f.id !== fileId));
  };

  // Проверка дали файлът може да се прегледа/принтира
  const isPreviewable = (type) =>
    type.startsWith("image/") || type === "application/pdf";

  return (
    <Container className="py-5">
      <h3 className="mb-4" style={{ color: "#2E8B57" }}>
        📁 Моето хранилище
      </h3>

      <Form className="mb-3 d-flex">
        <Form.Control
          type="file"
          onChange={(e) => setNewFile(e.target.files[0])}
        />
        <Button
          variant="success"
          className="ms-2"
          onClick={handleUpload}
          disabled={!newFile}
        >
          Качване
        </Button>
      </Form>

      {files.length === 0 ? (
        <p>Все още няма документи.</p>
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
                  {/* Изтегляне */}
                  <Button
                    variant="outline-primary"
                    onClick={() => handleDownload(file)}
                    title="Изтегли"
                  >
                    <FileDown size={16} />
                  </Button>

                  {/* Преглед */}
                  {isPreviewable(file.type) && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => window.open(file.content, "_blank")}
                      title="Преглед"
                    >
                      <FileText size={16} />
                    </Button>
                  )}

                  {/* Принтиране */}
                  {isPreviewable(file.type) && (
                    <Button
                      variant="outline-success"
                      onClick={() => handlePrint(file)}
                      title="Принтирай"
                    >
                      <Printer size={16} />
                    </Button>
                  )}

                  {/* Премахване */}
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemove(file.id)}
                    title="Премахни"
                  >
                    ❌
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Storage;
