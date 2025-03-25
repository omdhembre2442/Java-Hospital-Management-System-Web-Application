package com.example.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Staff;
import com.example.demo.repo.StaffRepo;
import com.example.demo.services.StaffSer;

@Service
public class StaffDao implements StaffSer{

	@Autowired
	StaffRepo srepo;

	@Override
	public boolean addStaff(Staff s, String email) {
		Staff s1 = srepo.findByEmail(email);
		
		if(s1!=null && s1.getEmail().equals(email)) {
			return false;
		}else {
			 srepo.save(s);
			 return true;
	    }
	}

	@Override
	public Staff loginPatient(String email, int password) {
		Staff s1 =srepo.findByEmail(email);
		
		if(s1.getEmail().equals(email) && s1.getPassword()==(password)) {
			return s1;
		}else {
			return null;
		}
	}

	@Override
	public List<Staff> getAll() {
		List<Staff> li = (List<Staff>) srepo.findAll();
		return li;
	}

	@Override
	public void edit(int id, Staff s) {
		Staff s1 = srepo.findById(id).get();
		
		s1.setId(s1.getId());
		s1.setName(s.getName());
		s1.setEmail(s.getEmail());
		s1.setPassword(s.getPassword());
		s1.setCpassword(s.getCpassword());
		s1.setRole(s.getRole());
		s1.setContact(s.getContact());
		s1.setStatus(s.getStatus());
		
		srepo.save(s1);
	}

	@Override
	public Staff getStaffId(int id) {
		Staff s1 = srepo.findById(id).get();
		return s1;
	}
}
