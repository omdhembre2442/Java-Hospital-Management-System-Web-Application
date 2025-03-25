package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Staff;
import com.example.demo.services.StaffSer;

@RestController
@CrossOrigin
@RequestMapping("/staff")
public class StaffController{

	@Autowired
	StaffSer sser;
	
	@PostMapping("/register")
	public ResponseEntity<String> registerStaff(@RequestBody Staff s) {
		if(s.getPassword()==(s.getCpassword())) {
			if(sser.addStaff(s,s.getEmail())) {
				return new ResponseEntity<String>("Staff Registered Sucessfully!",HttpStatus.CREATED);
			}
		}
			return new ResponseEntity<String>("Staff Not Registered Sucessfully!",HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Staff s){
		System.out.println(s);
		Staff s1 = sser.loginPatient(s.getEmail(),s.getPassword());
		
		if(s1!=null) {
			System.out.println(s1);
			return new ResponseEntity<Staff>(s1,HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Invalid Ceredentials",HttpStatus.ALREADY_REPORTED);
		}
	}
	
	@GetMapping("/getStaff")
	public List<Staff> getStaff(){
		List<Staff> li = sser.getAll();
		return li;
	}
	
	@PutMapping("/{id}/editStaff")
	public String editStaff(@RequestBody Staff s, @PathVariable int id) {
		sser.edit(id,s);
		System.out.println(s);
		return "Staff Updated Sucessfully";
	}
	
	@GetMapping("/{id}/getStaffUsingId")
	public Staff getStaffById(@PathVariable int id){
		Staff li = sser.getStaffId(id);
		return li;
	}
}
