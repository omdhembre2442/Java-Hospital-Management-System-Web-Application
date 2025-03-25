import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function AddRoom() {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    roomType: "General",
    roomStatus: "Available",
    capacity: 1,
  });

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(roomData);
    try {
      await axios.post("http://localhost:8080/room/addRoom", roomData);
      
      toast.success("Room added successfully!");
    } catch (error) {
      toast.error("Error adding room!");
      console.error("Room form error:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-4 mb-4">
      <Card className="shadow-lg p-4 border-0 rounded-3">
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
            🏥 Add New Room
          </h2>

          <Form onSubmit={handleSubmit}>
            {/* Room Number */}
            <Form.Group className="mb-3">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="text"
                name="roomNumber"
                placeholder="Enter Room Number"
                value={roomData.roomNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Room Type */}
            <Form.Group className="mb-3">
              <Form.Label>Room Type</Form.Label>
              <Form.Select name="roomType" value={roomData.roomType} onChange={handleChange}>
                <option value="General">General</option>
                <option value="ICU">ICU</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Private">Private</option>
              </Form.Select>
            </Form.Group>

            {/* Room Status */}
            <Form.Group className="mb-3">
              <Form.Label>Room Status</Form.Label>
              <Form.Select name="roomStatus" value={roomData.roomStatus} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </Form.Select>
            </Form.Group>

            {/* Capacity */}
            <Form.Group className="mb-3">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                min="1"
                value={roomData.capacity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100" style={{ backgroundColor: "#2DAA9E", border: "none" }}>
              Add Room
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddRoom;
