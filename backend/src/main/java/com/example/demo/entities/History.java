package com.example.demo.entities;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;


@EntityListeners(AuditingEntityListener.class)
@Entity
public class History {
	@Id
	@GeneratedValue
	private int id;
	
	@ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
	@JsonBackReference
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name = "doctor_id", nullable = false)
	private Doctor doctor;
	
	@CreatedDate
	@Column(updatable = false)
	private Date createdDate;
	private String descrption;
	private String medication;
	private String status;
	
	

	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public History() {
		super();
		// TODO Auto-generated constructor stub
	}


	public History(int id, Patient patient, Doctor doctor, Date createdDate, String descrption, String medication,String status) {
		super();
		this.id = id;
		this.patient = patient;
		this.doctor = doctor;
		this.createdDate = createdDate;
		this.descrption = descrption;
		this.medication = medication;
		this.status = status;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
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


	public Date getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	public String getDescrption() {
		return descrption;
	}


	public void setDescrption(String descrption) {
		this.descrption = descrption;
	}


	public String getMedication() {
		return medication;
	}


	public void setMedication(String medication) {
		this.medication = medication;
	}


	
}
