package com.example.demo.services;

import java.util.List;

import com.example.demo.entities.Staff;

public interface StaffSer {

	boolean addStaff(Staff s, String email);

	Staff loginPatient(String email, int password);

	List<Staff> getAll();

	void edit(int id, Staff s);

	Staff getStaffId(int id);

}
