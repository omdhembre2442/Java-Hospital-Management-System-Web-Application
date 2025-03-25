package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Staff {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String email;
	private int password;
	private int cpassword;
	private String role;
	private String contact;
	private String status;
	
	public Staff() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Staff(int id, String name, String email, int password, int cpassword, String role, String contact,
			String status) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.cpassword = cpassword;
		this.role = role;
		this.contact = contact;
		this.status = status;
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
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Staff [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", cpassword="
				+ cpassword + ", role=" + role + ", contact=" + contact + ", status=" + status + "]";
	}
	
}
