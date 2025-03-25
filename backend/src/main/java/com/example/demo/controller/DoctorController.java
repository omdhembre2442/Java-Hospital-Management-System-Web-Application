package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Doctor;
import com.example.demo.services.DoctorSer;

@RestController
@RequestMapping("/doctor")
@CrossOrigin
public class DoctorController {

	@Autowired
	DoctorSer dser;
	
	@PostMapping("/registration")
	public ResponseEntity<String> registerDoctor(@RequestBody Doctor d){
		if(d.getPassword()==d.getCpassword()) {
			if(dser.saveDoctor(d,d.getEmail())) {
				return new ResponseEntity<String>("User Registered Sucessfully!",HttpStatus.CREATED); 
			}
		}
		return new ResponseEntity<String>("User Registered Sucessfully!",HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginDoctor(@RequestBody Doctor d) {
		Doctor d1 = dser.doctorLogin(d.getEmail(),d.getPassword());
		
		if(d1!=null) {
			return new ResponseEntity<Doctor>(d1,HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Invalid Cerendentials",HttpStatus.ALREADY_REPORTED);
		}
	}
	
	@GetMapping("/doctorCount")
	public Long countDoctor() {
		Long cnt = dser.cntDoctor();
		return cnt;
	}
	
	@GetMapping("/getDoctors")
	public List<Doctor> getDoctor(){
		List<Doctor> li = dser.getAll();
		return li;
	}
	
	@DeleteMapping("/{id}/deleteDoctor")
	public void deleteDoctor(@PathVariable int id) {
		dser.deleteDoc(id);
	}
	
	@PutMapping("/{id}/editDoctor")
	public String editDoctor(@PathVariable int id,@RequestBody Doctor d) {
		dser.doctorEdit(id,d);
		return "Doctor Updated Successfully";
	}

}
