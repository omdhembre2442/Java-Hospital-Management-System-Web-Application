import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComp from "./Navbar";
import Footer from "./Footer";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComp />

      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Row>
          <Col className="text-center">
            <h1 className="display-3 text-danger fw-bold">404</h1>
            <h2 className="text-dark">Page Not Found</h2>
            <p className="text-muted">The page you are looking for doesn’t exist.</p>
            
            <Button 
              onClick={() => navigate("/")} 
              className="mt-3"
              style={{ 
                backgroundColor: "#66D2CE", 
                borderColor: "#66D2CE",
                color: "white",
                padding: "10px 20px",
                fontSize: "18px",
                borderRadius: "8px",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              Go to Home
            </Button>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default Error;
