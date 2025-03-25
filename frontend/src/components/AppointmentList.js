import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [roomCategory, setRoomCategory] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const doctorId = sessionStorage.getItem("doctorid");
  const user = sessionStorage.getItem("role");

  useEffect(() => {
    doctorId ? fetchDoctorAppointments(doctorId) : fetchAppointments();
  }, []);

  const fetchDoctorAppointments = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/appointment/${id}/doctorList`);
      setAppointments(res.data);
    } catch {
      toast.error("Failed to fetch doctor's appointments.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/appointment/list");
      setAppointments(res.data);
    } catch {
      toast.error("Error fetching appointments.");
    }
  };

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status);
    setNewDescription(appointment.notes || "");
    setNewMedication(appointment.medication || "");
    setShowModal(true);
    setRoomCategory("");
    setSelectedRoom("");
    setAvailableRooms([]);
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setRoomCategory(category);
    setSelectedRoom("");
    setAvailableRooms([]);

    if (category) {
      try {
        const res = await axios.get(`http://localhost:8080/room/availableRooms/${category}`);
        setAvailableRooms(res.data);
        console.log(res.data);
      } catch {
        toast.error("Error fetching available rooms.");
      }
    }
  };

  const handleStatusUpdate = async () => {
    
    try {
      const res = await axios.put(`http://localhost:8080/appointment/${selectedAppointment.id}/updateStatus`, {
        status: newStatus,
        notes: newDescription,
        medication: newMedication,
        roomCategory: newStatus === "Admitted" ? roomCategory : null,
        roomId: newStatus === "Admitted" ? selectedRoom : null,
      });
      if(res.status===202){
      toast.error("Room is Full!");
      }else{
      toast.success("Appointment status updated!");
      }
      fetchAppointments();
      setShowModal(false);
    } catch {
      toast.error("Failed to update status.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4" style={{ color: "#66D2CE", fontWeight: "bold" }}>
        📅 Appointment List
      </h2>

      <Table striped bordered hover responsive className="shadow-sm" style={{ backgroundColor: "#EAEAEA" }}>
        <thead style={{ backgroundColor: "#66D2CE", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patient?.name || "Unknown"}</td>
              <td>{appointment.doctor?.name || "Unknown"}</td>
              <td>{appointment.status}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditClick(appointment)}
                  style={{ backgroundColor: "#FFA62B", border: "none", color: "white", fontWeight: "bold" }}
                >
                  ✏️ Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Updating Appointment */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#66D2CE", color: "white" }}>
          <Modal.Title>📝 Edit Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#E3D2C3" }}>
          {/* Status Selection */}
          <Form.Group className="mb-3">
            <Form.Label><strong>Status</strong></Form.Label>
            <Form.Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              style={{ backgroundColor: "white", borderColor: "#2DAA9E" }}
            >
              <option value="Cancelled">Cancelled</option>
              <option value="Admitted">Admitted</option>
              <option value="Scheduled">Scheduled</option>
              {user === "Doctor" && <option value="Completed">Completed</option>}
            </Form.Select>
          </Form.Group>

          {/* Room Selection when Admitted */}
          {newStatus === "Admitted" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label><strong>Room Category</strong></Form.Label>
                <Form.Select
                  value={roomCategory}
                  onChange={handleCategoryChange}
                  style={{ backgroundColor: "white", borderColor: "#2DAA9E" }}
                >
                  <option value="" disabled>Select Category</option>
                  <option value="ICU">ICU</option>
                  <option value="General">General</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Private">Private</option>
                </Form.Select>
              </Form.Group>

              {availableRooms.length > 0 && (
                <Form.Group className="mb-3">
                  <Form.Label><strong>Available Rooms</strong></Form.Label>
                  <Form.Select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    style={{ backgroundColor: "white", borderColor: "#2DAA9E" }}
                  >
                    <option value="" disabled>Select Room</option>
                    {availableRooms.map((room) => (
                      <option key={room.id} value={room.id}>{roomCategory}-{room.roomNumber}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
            </>
          )}

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label><strong>Description</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              style={{ backgroundColor: "white", borderColor: "#2DAA9E" }}
            />
          </Form.Group>

          {/* Medication */}
          {user === "Doctor" &&
          <Form.Group>
            <Form.Label><strong>Medication</strong></Form.Label>
            <Form.Control
              type="text"
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              style={{ backgroundColor: "white", borderColor: "#2DAA9E" }}
            />
          </Form.Group>
          }
        </Modal.Body>
          

        <Modal.Footer style={{ backgroundColor: "#E3D2C3" }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>❌ Close</Button>
          <Button variant="success" onClick={handleStatusUpdate} style={{ backgroundColor: "#2DAA9E", border: "none" }}>✅ Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AppointmentList;
