package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Patient;
import com.example.demo.services.PatientSer;

@RestController
@RequestMapping("/patient")
@CrossOrigin
public class PatientController {
	
	@Autowired
	PatientSer ser;
	
	@PostMapping("/registration")
	public ResponseEntity<String> registerPatient(@RequestBody Patient p) {
		if(p.getPassword().equals(p.getCpassword())) {
			if(ser.addPatient(p,p.getEmail())) {
				return new ResponseEntity<String>("User Registered Sucessfully!",HttpStatus.CREATED);
			}
		}
			return new ResponseEntity<String>("User Not Registered Sucessfully!",HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Patient p){
		Patient p1 = ser.loginPatient(p.getEmail(),p.getPassword());
		
		if(p1!=null) {
			return new ResponseEntity<Patient>(p1,HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Invalid Ceredentials",HttpStatus.UNAUTHORIZED);
		}
	}
	
	@GetMapping("/patientCount")
	public Long countPatient() {
		Long cnt = ser.PatientCount();
		return cnt;
	}
	
}
