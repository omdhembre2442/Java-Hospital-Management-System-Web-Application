import React, { useEffect, useState } from "react";
import { Table, Button, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import EditDoctor from "./EditDoctor";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/doctor/getDoctors");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/doctor/${id}/deleteDoctor`);
      toast.success("Doctor deleted successfully!");
      fetchDoctors();
    } catch (error) {
      toast.error("Failed to delete doctor!");
    }
  };

  const onEdit = (doctor) => {
    setSelectedDoctor(doctor); 
    setIsEditing(true); 
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setSelectedDoctor(null);
    fetchDoctors(); 
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title style={{ color: "#2DAA9E" }}>Doctor List</Card.Title>

          {!isEditing ? (
          <Table striped bordered hover>
            <thead style={{ backgroundColor: "#66D2CE", color: "#FFFFFF" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.experience}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => onEdit(doctor)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => onDelete(doctor.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        ) : (
          <EditDoctor doctor={selectedDoctor} onClose={handleCloseEdit} />
        )}
      </Card.Body>
    </Card>
  );
}

export default DoctorList;
