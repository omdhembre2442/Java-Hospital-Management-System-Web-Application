import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaHeartbeat, FaBrain, FaBone, FaChild, FaEye, FaLungs, FaTooth, FaUserMd } from "react-icons/fa";

const departments = [
  { icon: <FaHeartbeat size={40} />, name: "Cardiology", desc: "Heart disease diagnosis and treatment." },
  { icon: <FaBrain size={40} />, name: "Neurology", desc: "Brain, spine, and nervous system care." },
  { icon: <FaBone size={40} />, name: "Orthopedics", desc: "Bone and joint treatments and surgeries." },
  { icon: <FaChild size={40} />, name: "Pediatrics", desc: "Medical care for infants and children." },
  { icon: <FaEye size={40} />, name: "Ophthalmology", desc: "Eye examinations and surgeries." },
  { icon: <FaLungs size={40} />, name: "Pulmonology", desc: "Lung and respiratory system treatments." },
  { icon: <FaTooth size={40} />, name: "Dentistry", desc: "Oral health, dental checkups, and surgeries." },
  { icon: <FaUserMd size={40} />, name: "General Medicine", desc: "Primary healthcare and disease management." },
];

function Department() {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ color: "#2DAA9E" }}>Specialized Departments</h2>
      <Row>
        {departments.map((dept, index) => (
          <Col key={index} md={3} sm={6} className="mb-4">
            <Card className="shadow-lg text-center p-3 border-0" style={{ backgroundColor: "#EAEAEA", borderRadius: "12px" }}>
              <Card.Body>
                <div className="mb-3" style={{ color: "#2DAA9E" }}>{dept.icon}</div>
                <Card.Title style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{dept.name}</Card.Title>
                <Card.Text style={{ fontSize: "0.9rem" }}>{dept.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Department;
