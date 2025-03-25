package com.example.demo.entities;


import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private int password;
	private int cpassword;
	private String specialization;
	private String phone;
	private String email;
	private int experience;
	private boolean gender;
	
	@OneToMany(mappedBy = "doctor")
	@JsonIgnore
	private List<Appointment> appointments;
	
	@OneToMany(mappedBy = "doctor")
	@JsonIgnore
	private List<History> history;

	public Doctor() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Doctor(int id, String name, int password, int cpassword, String specialization, String phone, String email,
			int experience, boolean gender, List<Appointment> appointments, List<History> history) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.cpassword = cpassword;
		this.specialization = specialization;
		this.phone = phone;
		this.email = email;
		this.experience = experience;
		this.gender = gender;
		this.appointments = appointments;
		this.history = history;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPassword() {
		return password;
	}

	public void setPassword(int password) {
		this.password = password;
	}

	public int getCpassword() {
		return cpassword;
	}

	public void setCpassword(int cpassword) {
		this.cpassword = cpassword;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getExperience() {
		return experience;
	}

	public void setExperience(int experience) {
		this.experience = experience;
	}

	public boolean isGender() {
		return gender;
	}

	public void setGender(boolean gender) {
		this.gender = gender;
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}

	public List<History> getHistory() {
		return history;
	}

	public void setHistory(List<History> history) {
		this.history = history;
	}

	@Override
	public String toString() {
		return "Doctor [id=" + id + ", name=" + name + ", password=" + password + ", cpassword=" + cpassword
				+ ", specialization=" + specialization + ", phone=" + phone + ", email=" + email + ", experience="
				+ experience + ", gender=" + gender + "]";
	}
		
}