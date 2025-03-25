package com.example.demo.services;

import com.example.demo.entities.Patient;

public interface PatientSer {

	boolean addPatient(Patient p, String email);

	Patient loginPatient(String email, String password);

	Long PatientCount();

}
