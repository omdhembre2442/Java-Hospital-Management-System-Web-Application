package com.example.demo.entities;

public class AppointmentUpdateDTO {

	    private String status;
	    private String notes;
	    private String medication;
	    private Integer roomId;
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getNotes() {
			return notes;
		}
		public void setNotes(String notes) {
			this.notes = notes;
		}
		public String getMedication() {
			return medication;
		}
		public void setMedication(String medication) {
			this.medication = medication;
		}
		public Integer getRoomId() {
			return roomId;
		}
		public void setRoomId(Integer roomId) {
			this.roomId = roomId;
		}
		@Override
		public String toString() {
			return "AppointmentUpdateDTO [status=" + status + ", notes=" + notes + ", medication=" + medication
					+ ", roomId=" + roomId + "]";
		}

	   


}
