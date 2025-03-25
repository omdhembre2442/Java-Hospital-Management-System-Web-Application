import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#2DAA9E', color: '#EAEAEA' }}>
      <Container className="py-4">
        <Row className="text-center mb-3">
          <Col>
            <h5>CareWell Hospital</h5>
            <p>Providing compassionate care with cutting-edge medical excellence.</p>
          </Col>
        </Row>

        <Row className="text-center mb-3">
          <Col>
            <FaFacebookF size={24} className="mx-2" style={{ color: '#E3D2C3', cursor: 'pointer' }} />
            <FaTwitter size={24} className="mx-2" style={{ color: '#E3D2C3', cursor: 'pointer' }} />
            <FaInstagram size={24} className="mx-2" style={{ color: '#E3D2C3', cursor: 'pointer' }} />
            <FaLinkedin size={24} className="mx-2" style={{ color: '#E3D2C3', cursor: 'pointer' }} />
            <FaGithub size={24} className="mx-2" style={{ color: '#E3D2C3', cursor: 'pointer' }} />
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <p style={{ margin: 0 }}>
              © 2025 CareWell Hospital | Dedicated to Your Health & Well-being.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
