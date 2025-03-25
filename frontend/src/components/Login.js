import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) =>{
    const{ name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

      try {
        if (formData.email==='admin@gmail.com' && formData.password==='admin@123') {
          toast.success("Admin Logged-In Successfully!");
          sessionStorage.setItem('username',formData.email);
          sessionStorage.setItem("role", "Admin"); 
          navigate('/admindash');
        }else{ 
        if(!formData.email.startsWith("dr.",0)){
        if (!formData.email.startsWith("staff.",0)) {
          let res = await axios.post('http://localhost:8080/patient/login',formData);
              if (res.status===200) {
              const patient = res.data;
              console.log(formData);
              sessionStorage.setItem('username',formData.email);
              sessionStorage.setItem("role", "Patient");
              sessionStorage.setItem("patientId", patient.id);
              toast.success("Patient Logged-In Successfully!");
              console.log(sessionStorage.getItem("patientId"));
              navigate('/');
          }
        }else{  
          let res = await axios.post('http://localhost:8080/staff/login',formData);
          if (res.status===200) {
            const staff = res.data;
            sessionStorage.setItem('username',formData.email);
            sessionStorage.setItem("role", "Staff");
            sessionStorage.setItem("staffId", staff.id);
            toast.success("Staff Logged-In Successfully!");
            navigate('/');
          }
        }  
        }else{  
        let response = await axios.post('http://localhost:8080/doctor/login',formData);
        if(response.status===200) {
            console.log(response.data);
            sessionStorage.setItem('username',formData.email);
            sessionStorage.setItem("role","Doctor");
            sessionStorage.setItem("doctorid",response.data.id);
            sessionStorage.setItem("gender",response.data.gender);
            toast.success("Doctor Logged-In Successfully!");
            navigate('/');
          }else{
          toast.error("Not Valid Username or Password!");
          }
        } 
      }   
    }
      catch (error) {
        toast.error('Not Valid Username or Password!')
      }
    }


  return (
    <div className="login-container" style={{marginTop:'-70px', marginBottom:'-70px'}}>
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="shadow-lg p-4 rounded">
              <Card.Body>
                <h3 className="text-center mb-4" style={{ color: "#2DAA9E" }}>
                  🏥 User Login
                </h3>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} required />
                  </Form.Group>

                  <Button variant="primary" className="w-100" type="submit" style={{ backgroundColor: "#66D2CE", border: "none" }}>
                    Login
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <p>
                    Don't have an account?{" "}
                    <span
                      style={{ color: "#2DAA9E", fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => navigate("/register")}
                    >
                      Register here
                    </span>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
