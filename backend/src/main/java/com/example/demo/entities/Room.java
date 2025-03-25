package com.example.demo.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Room {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String roomNumber;
	private String roomType;
	private String roomStatus;
	private int filledCapacity;
	private int capacity;
	
	@OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Appointment> appointments;

	public Room() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Room(int id, String roomNumber, String roomType, String roomStatus, int filledCapacity, int capacity,
			List<Appointment> appointments) {
		super();
		this.id = id;
		this.roomNumber = roomNumber;
		this.roomType = roomType;
		this.roomStatus = roomStatus;
		this.filledCapacity = filledCapacity;
		this.capacity = capacity;
		this.appointments = appointments;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public String getRoomStatus() {
		return roomStatus;
	}

	public void setRoomStatus(String roomStatus) {
		this.roomStatus = roomStatus;
	}

	public int getFilledCapacity() {
		return filledCapacity;
	}

	public void setFilledCapacity(int filledCapacity) {
		this.filledCapacity = filledCapacity;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}

	@Override
	public String toString() {
		return "Room [id=" + id + ", roomNumber=" + roomNumber + ", roomType=" + roomType + ", roomStatus=" + roomStatus
				+ ", filledCapacity=" + filledCapacity + ", capacity=" + capacity +"]";
	}

}
