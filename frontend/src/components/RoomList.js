import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RoomList() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch Rooms from API
  useEffect(() => {
    axios.get("http://localhost:8080/room/getAllRoom")
      .then(response => {
        const groupedRooms = groupRoomsByType(response.data);
        setRooms(groupedRooms);
      })
      .catch(error => console.error("Error fetching rooms:", error));
  }, []);

  // Group rooms by type (ICU, General, Deluxe, Private)
  const groupRoomsByType = (roomList) => {
    return roomList.reduce((acc, room) => {
      const { roomType } = room;
      if (!acc[roomType]) {
        acc[roomType] = [];
      }
      acc[roomType].push(room);
      return acc;
    }, {});
  };

  // Handle room click
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4" style={{ color: "#66D2CE", fontWeight: "bold" }}>🏥 Hospital Room List</h2>

      <Button
        onClick={() => navigate("/addroom")}
        className="mb-4"
        style={{ backgroundColor: "#FFA62B", border: "none", fontWeight: "bold" }}
      >
        ➕ Add Room
      </Button>

      {/* Room Sections */}
      {Object.keys(rooms).length > 0 ? (
        Object.keys(rooms).map((section) => (
          <div key={section} className="mb-4">
            <h4 style={{ color: "#2DAA9E", fontWeight: "bold" }}>🔹 {section} Rooms</h4>
            <Row className="g-3">
              {rooms[section].map((room) => (
                <Col key={room.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="text-center shadow-sm"
                    style={{ cursor: "pointer", backgroundColor: "#EAEAEA", border: "none" }}
                    onClick={() => handleRoomClick(room)}
                  >
                    <Card.Body>
                      <h5 style={{ color: "#2DAA9E", fontWeight: "bold" }}>{section}-{room.roomNumber}</h5>
                      <p>Status: <strong>{room.roomStatus}</strong></p>
                      <p>Capacity: <strong>{room.filledCapacity} / {room.capacity}</strong></p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))
      ) : (
        <p className="text-center">Loading rooms...</p>
      )}

      {/* Room Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Room Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoom && (
            <>
              <p><strong>Room Number:</strong> {selectedRoom.roomNumber}</p>
              <p><strong>Room Type:</strong> {selectedRoom.roomType}</p>
              <p><strong>Capacity:</strong> {selectedRoom.capacity}</p>
              <p><strong>Filled Capacity:</strong>{selectedRoom.filledCapacity}</p>
              <p><strong>Status:</strong> {selectedRoom.roomStatus}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RoomList;
