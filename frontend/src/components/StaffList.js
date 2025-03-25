import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import EditStaff from "./EditStaff";

function StaffList() {
  const [staff, setStaff] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:8080/staff/getStaff");
      setStaff(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load staff list.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/staff/delete/${id}`);
      toast.success("Staff deleted successfully!");
      fetchStaff();
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error("Failed to delete staff.");
    }
  };

  const onEdit = (id) => {
    setSelectedStaff(id);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setSelectedStaff(null);
    fetchStaff();
  };

  return (
    <Container>
      {!isEditing ? (
        <>
          <h2 className="text-center my-4" style={{ color: "#2DAA9E", fontWeight: "bold" }}>
            🏥 Staff List
          </h2>

          <Table striped bordered hover responsive className="shadow-lg">
            <thead style={{ backgroundColor: "#2DAA9E", color: "#ffffff" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.length > 0 ? (
                staff.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.role}</td>
                    <td>{member.contact}</td>
                    <td>
                      <span className={member.status === "Active" ? "text-success" : "text-danger"}>
                        {member.status}
                      </span>
                    </td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => onEdit(member.id)} className="me-2">
                        ✏️ Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(member.id)}>
                        ❌ Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No staff members found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <EditStaff staffId={selectedStaff} onClose={handleCloseEdit} />
      )}
    </Container>
  );
}

export default StaffList;
    