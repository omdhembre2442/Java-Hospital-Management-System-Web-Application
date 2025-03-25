package com.example.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Patient;
import com.example.demo.repo.PatientRepo;
import com.example.demo.services.PatientSer;

@Service
public class PatientDao implements PatientSer{
	
	@Autowired
	PatientRepo prepo;

	@Override
	public boolean addPatient(Patient p, String email) {
		Patient p1 = prepo.findByEmail(email);
		
		if(p1!=null && p.getEmail().equals(p1.getEmail())) {
		return false;
		}else {
			prepo.save(p);
			return true;
		}
	}

	@Override
	public Patient loginPatient(String email, String password) {
		Patient p1 =prepo.findByEmail(email);
		
		if(p1.getEmail().equals(email) && p1.getPassword().equals(password)) {
			return p1;
		}else {
			return null;
		}
	}

	@Override
	public Long PatientCount() {
		Long cnt = prepo.count();
		return cnt;
	}

}
