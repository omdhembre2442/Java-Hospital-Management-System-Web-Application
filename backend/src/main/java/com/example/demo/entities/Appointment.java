package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

@Entity
public class Appointment {

	@Id
	@GeneratedValue (strategy = GenerationType.AUTO)
	private int id;
	private String status="Pending";
	
	
	private String date;
	private String time;
	private String notes;
	private String medication;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctor;
	
	@ManyToOne
	@JoinColumn(name="room_id")
	private Room room;

	@Transient  // ❗ This field will NOT be stored in the database
	private Integer roomId;
	
	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Appointment(int id, String status, String date, String time, String notes, String medication,
			Patient patient, Doctor doctor, Room room) {
		super();
		this.id = id;
		this.status = status;
		this.date = date;
		this.time = time;
		this.notes = notes;
		this.medication = medication;
		this.patient = patient;
		this.doctor = doctor;
		this.room = room;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDate() {
		return date;
	}
	
	public Integer getRoomId() {
	    return room != null ? room.getId() : null;
	}
	
	public void setRoomId(Integer roomId) {
	    this.roomId = roomId;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
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

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	@Override
	public String toString() {
		return "Appointment [id=" + id + ", status=" + status + ", date=" + date + ", time=" + time + ", notes=" + notes
				+ ", medication=" + medication + ", patient=" + patient + ", doctor=" + doctor + ", room=" + room + "]";
	}
		
	
}
