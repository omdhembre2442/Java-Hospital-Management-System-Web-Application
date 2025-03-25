package com.example.demo.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String email;
	private String password;
	private String cpassword;
	private int age;
	private boolean gender;
	private String phone;
	private String address;
	private String blood;
	
	@OneToMany(mappedBy = "patient")
	@JsonIgnore
	private List<Appointment> appointments;

	@OneToMany(mappedBy = "patient")
	@JsonIgnore
	private List<History> history;

	public Patient() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Patient(int id, String name, String email, String password, String cpassword, int age, boolean gender,
			String phone, String address, String blood, List<Appointment> appointments, List<History> history) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.cpassword = cpassword;
		this.age = age;
		this.gender = gender;
		this.phone = phone;
		this.address = address;
		this.blood = blood;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCpassword() {
		return cpassword;
	}

	public void setCpassword(String cpassword) {
		this.cpassword = cpassword;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public boolean isGender() {
		return gender;
	}

	public void setGender(boolean gender) {
		this.gender = gender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBlood() {
		return blood;
	}

	public void setBlood(String blood) {
		this.blood = blood;
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
	    return "Patient [id=" + id + ", name=" + name + ", email=" + email + ", age=" + age +
	           ", gender=" + gender + ", phone=" + phone + ", address=" + address +
	           ", blood=" + blood + "]";
	}
}
