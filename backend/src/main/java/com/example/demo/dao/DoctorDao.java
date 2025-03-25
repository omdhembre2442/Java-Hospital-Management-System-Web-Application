package com.example.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Doctor;
import com.example.demo.repo.DoctorRepo;
import com.example.demo.services.DoctorSer;

@Service
public class DoctorDao implements DoctorSer {
	
	@Autowired
	DoctorRepo drepo;

	@Override
	public boolean saveDoctor(Doctor d, String email) {
		Doctor d1 = drepo.findByEmail(email);
		
		if (d1!=null && d1.getEmail().equals(d.getEmail())) {
			return false;
		} else {
			drepo.save(d);
			return true;
		}
	}

	@Override
	public Doctor doctorLogin(String email, int password) {
		Doctor d1 = drepo.findByEmail(email);
		
		if(d1.getEmail().equals(email) && d1.getPassword()==password) {
			return d1;
		}else {
			return null;	
		}
	}

	@Override
	public Long cntDoctor() {
		Long cnt = drepo.count();
		return cnt;
	}

	@Override
	public List<Doctor> getAll() {
		List<Doctor> li = (List<Doctor>) drepo.findAll();
		return li;
	}

	@Override
	public void deleteDoc(int id) {
		drepo.deleteById(id);
	}

	@Override
	public String doctorEdit(int id, Doctor d) {
		Doctor d1 = drepo.findById(id).get();
		d1.setId(id);
		d1.setSpecialization(d.getSpecialization());
		d1.setExperience(d.getExperience());
		d1.setPhone(d.getPhone());
		d1.setName(d.getName());
		d1.setEmail(d.getEmail());
		d1.setCpassword(d1.getCpassword());
		d1.setPassword(d1.getPassword());
		d1.setGender(d.isGender());
		drepo.save(d1);
		return "Doctor Updated";
	}

}
