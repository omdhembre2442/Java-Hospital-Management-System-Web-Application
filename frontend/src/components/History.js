import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const patientId = sessionStorage.getItem("patientId");

  useEffect(() => {
    fetchMedicalHistory();
  }, [patientId]);

  const fetchMedicalHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/history/${patientId}/medicalHistory`); 
      setHistory(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load medical history.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center" style={{ color: "#2DAA9E", fontWeight: "bold" }}>📜 Medical History</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover className="mt-3">
        <thead style={{ backgroundColor: "#66D2CE", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Description</th>
            <th>Medication</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.doctor?.id || "Unknown"}</td>
                <td>{new Date(record.createdDate).toLocaleDateString()} {new Date(record.createdDate).toLocaleTimeString()}</td>
                <td>{record.descrption}</td>
                <td>{record.medication}</td>
                <td>{record.status}</td>                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No history records found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default History;
