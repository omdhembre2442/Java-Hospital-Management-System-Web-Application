package com.example.demo.services;

import java.util.List;

import com.example.demo.entities.Doctor;

public interface DoctorSer {

	boolean saveDoctor(Doctor d, String email);

	Doctor doctorLogin(String email, int password);

	Long cntDoctor();

	List<Doctor> getAll();

	void deleteDoc(int id);

	String doctorEdit(int id, Doctor d);

}
