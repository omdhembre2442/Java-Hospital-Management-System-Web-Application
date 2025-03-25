import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import background from "./image/background.png";
import advertisement from "./image/adv.png";
import DoctorRegistration from "./DoctorRegistration";
import { toast } from "react-toastify";
import DoctorList from "./DoctorList";
import AppointmentList from "./AppointmentList";
import RegisterStaff from "./RegistrationStaff";
import StaffList from "./StaffList";
import RoomList from "./RoomList";

function Admindash() {
  const navigate = useNavigate();
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [admittedCount, setAdmittedCount] = useState(0);
  const [bedsCount, setBedsCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [user] = useState(sessionStorage.getItem("username") || null);
  const [doctor,setDoctors] = useState();


  useEffect(() => {
    const res = sessionStorage.getItem("username");
    if (res !== "admin@gmail.com") {
      navigate("/home");
    }
  },);

  useEffect(()=>{
    async function fetchPatientCount() {
      const res = await axios.get('http://localhost:8080/patient/patientCount');
      setPatientCount(res.data);
    }
    fetchPatientCount();
  }, []);

  useEffect(()=>{
    async function fetchRoomCount() {
      const res = await axios.get('http://localhost:8080/room/roomCount');
      setRoomCount(res.data);
    }
    fetchRoomCount();
  }, []);

  useEffect(()=>{
    async function fetchDoctorCount() {
      const res = await axios.get('http://localhost:8080/doctor/doctorCount');
      setDoctorCount(res.data);
    }
    fetchDoctorCount();
  }, []);

  useEffect(()=>{
    async function fetchAppointmentCount() {
      const res = await axios.get('http://localhost:8080/appointment/appointmentCount');
      setAppointmentCount(res.data);
    }
    fetchAppointmentCount();
  }, []);

  useEffect(()=>{
    async function fetchAdmittedCount() {
      const res = await axios.get('http://localhost:8080/appointment/admittedCount');
      setAdmittedCount(res.data);
    }
    fetchAdmittedCount();
  }, []);

  useEffect(()=>{
    async function fetchBedCount() {
      const res = await axios.get('http://localhost:8080/room/bedCount');
      setBedsCount(res.data);
    }
    fetchBedCount();
  }, []);

  useEffect(()=>{
    fetchDoctors();
  }, []);

  const fetchDoctors= async()=>{
    try {
      const res = await axios.get('http://localhost:8080/doctor/getDoctors');
      setDoctors(res.data);
    } catch (error) {
      toast.error("Error fetching doctors");
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "addDoctor":
        return <DoctorRegistration />;
      case "addStaff":
        return <RegisterStaff />;
      case "appointments":
        return <AppointmentList />;
      case "doctorList":
        return <DoctorList/>;
      case "staffList":
        return <StaffList />;
      case "roomOccupied":
        return <RoomList />;
      default:
        return (
          <div>
          <Row className="mt-3">
          <Container fluid className="mt-4 position-relative">
                <Card className="shadow-lg p-4 position-relative" style={{ backgroundColor: "#2DAA9E",
          borderRadius: "12px",
          backgroundImage: `url(${background})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "200px",
          display: "flex",
          alignItems: "center", }}>
                    <Row className="w-100 align-items-center">
                    <Col md={8}>
                        <h2 style={{ color: "#fff", fontWeight: "bold" ,textAlign: "left" }}>Good Morning, {user.split("@")[0]}!</h2>
                        <h6 style={{ color: "#fff", opacity: "0.9", textAlign: "left"  }}>
                        "Every sunrise brings a new opportunity to heal, to serve, and to make a <br />
                        difference in someone's life. Let kindness be our medicine, and care be our mission." 🌅🏥✨
                        </h6>
                    </Col>
                    </Row>
                </Card>
                <img
                    src={advertisement}
                    alt="Doctor"
                    className="position-absolute"
                    style={{
                        right: "0", 
                        bottom: "0",
                        height: "280px",
                        objectFit: "contain",
                        transform: "translateY(0%)"
                    }}
                />
        </Container>
        </Row>    
          <Row className="mt-5">
            <Col md={4}>
              <Card className="text-center shadow" style={{ borderColor: "#2DAA9E" }}>
                <Card.Body>
                  <Card.Title style={{ color: "#66D2CE" }}>Total Patients</Card.Title>
                  <h2>{patientCount}</h2>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="text-center shadow" style={{ borderColor: "#2DAA9E" }}>
                <Card.Body>
                  <Card.Title style={{ color: "#66D2CE" }}>Total Doctors</Card.Title>
                  <h2>{doctorCount}</h2>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="text-center shadow" style={{ borderColor: "#2DAA9E" }}>
                <Card.Body>
                  <Card.Title style={{ color: "#66D2CE" }}>Total Appointments</Card.Title>
                  <h2>{appointmentCount}</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <Card className="text-center shadow" style={{ borderColor: "#2DAA9E" }}>
                <Card.Body>
                  <Card.Title style={{ color: "#66D2CE" }}>Available Beds</Card.Title>
                  <h2>{bedsCount}</h2>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="text-center shadow" style={{ borderColor: "#2DAA9E" }}>
                <Card.Body>
                  <Card.Title style={{ color: "#66D2CE" }}>Admitted Patient</Card.Title>
                  <h2>{admittedCount}</h2>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="text-center shadow" style={{ borderColor: "#2DAA9E" }}>
                <Card.Body>
                  <Card.Title style={{ color: "#66D2CE" }}>Total Rooms</Card.Title>
                  <h2>{roomCount}</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>
         </div> 
        );
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={3} className="bg-light shadow-sm p-3">
          <h4 className="text-center text-primary">Admin Menu</h4>
          <Nav className="flex-column">
            <Nav.Link onClick={() => setSelectedMenu("dashboard")} className="text-dark">🏠 Dashboard</Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu("addDoctor")} className="text-dark">➕ Add Doctor</Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu("addStaff")} className="text-dark">👩‍⚕️ Add Staff</Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu("appointments")} className="text-dark">📅 Appointments</Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu("doctorList")} className="text-dark">👨‍⚕️ Doctor List</Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu("staffList")} className="text-dark">👩‍💼 Staff List</Nav.Link>
            <Nav.Link onClick={() => setSelectedMenu("roomOccupied")} className="text-dark">🏥 Room Occupied</Nav.Link>
          </Nav>
        </Col>

        <Col md={9} className="p-4">
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default Admindash;
