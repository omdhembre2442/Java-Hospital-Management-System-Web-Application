import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";

function Contact() {
  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg border-0 rounded-3" style={{ backgroundColor: "#E3D2C3", padding: "20px" }}>
            <Row>
              <Col md={5} className="d-flex align-items-center">
                <div className="p-3">
                  <h2 className="text-center" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
                    📞 Contact Us
                  </h2>
                  <p style={{ color: "#555", fontSize: "16px", textAlign: "center" }}>
                    We're here to assist you! Reach out to us for any inquiries.
                  </p>
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    <li style={{ color: "#2DAA9E", fontSize: "18px", marginBottom: "10px" }}>
                      <FaMapMarkerAlt /> Location: Katraj, Pune
                    </li>
                    <li style={{ color: "#2DAA9E", fontSize: "18px", marginBottom: "10px" }}>
                      <FaPhoneAlt /> Phone: +91 98765 43210
                    </li>
                    <li style={{ color: "#2DAA9E", fontSize: "18px" }}>
                      <FaEnvelope />  Email: omdhembre244@gmail.com
                    </li>
                  </ul>
                </div>
              </Col>

              <Col md={7}>
                <Card className="border-0 rounded-3 shadow-sm p-4" style={{ backgroundColor: "#FFF" }}>
                  <h3 className="text-center" style={{ color: "#2DAA9E", fontWeight: "bold" }}>📩 Send a Message</h3>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your name" style={{ borderRadius: "10px" }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" style={{ borderRadius: "10px" }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Your message here..." style={{ borderRadius: "10px" }} />
                    </Form.Group>
                    <Button className="w-100" style={{ backgroundColor: "#2DAA9E", border: "none", borderRadius: "10px" }}>
                      <FaPaperPlane /> Send Message
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
