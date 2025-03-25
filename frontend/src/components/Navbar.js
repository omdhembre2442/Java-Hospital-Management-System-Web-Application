import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import patient from "./image/patient.png";
import admin from "./image/admin.png";
import femaleDoctor from "./image/femaledoctor.png";
import staff from "./image/receptionist.png";
import maleDoctor from "./image/mandoc.png";

function HeaderNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(sessionStorage.getItem("username") || null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, [sessionStorage.getItem("username")]);

  const userRole = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const getProfilePic =()=>{
    if(userRole === "Doctor") {return sessionStorage.getItem("gender") === "true" ? maleDoctor : femaleDoctor};
    if(userRole === "Admin") return admin;
    if(userRole === "Staff") return staff;
    if(userRole === "Patient") return patient;
  }

  return (
    <header>
      <div
        className="text-center shadow-sm"
        style={{
          backgroundColor: "white",
          color: "#66D2CE",
          padding: "10px",
          width: "100%",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "1000",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        🏥 WELCOME TO HOSPITAL MANAGEMENT SYSTEM 🏥
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-light shadow-sm"
        style={{
          backgroundColor: "#2DAA9E",
          marginTop: "50px",
          position: "fixed",
          width: "100%",
          zIndex: "999",
        }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-light fw-bold">
            CareWell
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/department">
                  Department
                </Link>
              </li>
              <li className="nav-item">
              {
                userRole === "Patient"?(<Link className="nav-link text-light" to="/appointments">Book Appointment</Link>):(
                 <></>)
              } 
              </li>
              <li className="nav-item">
              {
                user === "admin@gmail.com"?(<Link className="nav-link text-light" to="/admindash">Admin</Link>):(
                  <></>)
              }                
              </li>
              <li className="nav-item">
              {
                userRole === "Doctor"?(<Link className="nav-link text-light" to="/appointmentsList">Appointments</Link>):(
                 <></>)
              }                
              </li>
              <li className="nav-item">
              {
                userRole === "Patient"?(<Link className="nav-link text-light" to="/history">History</Link>):(
                 <></>)
              }                
              </li>
              <li className="nav-item">
              {
                userRole === "Staff"?(<Link className="nav-link text-light" to="/appointmentsList">Appointment</Link>):(
                 <></>)
              }                
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center">
                <Image src={getProfilePic()} roundedCircle width="40" height="40" className="me-2" />
                <span className="text-white me-3">Welcome, {user.split("@")[0]}</span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  className="btn"
                  style={{
                    backgroundColor: "#E3D2C3",
                    color: "#374785",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderNavbar;
