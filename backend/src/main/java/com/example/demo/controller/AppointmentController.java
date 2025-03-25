package com.example.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

import com.example.demo.entities.Appointment;
import com.example.demo.entities.AppointmentUpdateDTO;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Patient;
import com.example.demo.repo.DoctorRepo;
import com.example.demo.repo.PatientRepo;
import com.example.demo.services.AppointmentSer;

@RestController
@RequestMapping("/appointment")
@CrossOrigin
public class AppointmentController {

	@Autowired
	AppointmentSer aser;
	
	@Autowired
	PatientRepo patientrepo;
	
	@Autowired
	DoctorRepo doctorrepo;	
	
	@PostMapping("/book")
	public ResponseEntity<String> saveAppointment( @RequestBody Map<String, Object> payload){ 
		try {
            int patientId = Integer.parseInt(payload.get("patientId").toString());
            int doctorId = Integer.parseInt(payload.get("doctorId").toString());
          
            Optional<Patient> patientOpt = patientrepo.findById(patientId);
            Optional<Doctor> doctorOpt = doctorrepo.findById(doctorId);

            if (!patientOpt.isPresent()) {
                return new ResponseEntity<>("Error: Patient not found!", HttpStatus.ACCEPTED);
            }
            if (!doctorOpt.isPresent()) {
                return new ResponseEntity<>("Error: Doctor not found!", HttpStatus.ACCEPTED);
            }

            Patient patient = patientOpt.get();
            Doctor doctor = doctorOpt.get();

            Appointment a = new Appointment();
            a.setPatient(patient);
            a.setDoctor(doctor);
            a.setStatus(payload.get("status").toString());
            a.setNotes(payload.get("notes").toString());

            aser.addAppointment(a);
            return new ResponseEntity<>("Appointment Booked Successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to Book Appointment! " + e.getMessage(), HttpStatus.ALREADY_REPORTED);
        }
    }
	
	@GetMapping("/list")
	public List<Appointment> appointmentList(){
		List<Appointment> li = aser.getall();
		return li;
 	}
	
	@DeleteMapping("/{id}/delete")
	public void delete(@PathVariable int id) {
		aser.deleteAppointment(id);
	}
	
	@GetMapping("/appointmentCount")
	public Long count() {
		Long cnt = aser.appointCnt();
		return cnt;
	}
	
	@GetMapping("/{id}/doctorList")
	public List<Appointment> getAppointmentOnDoctor(@PathVariable int id){
		List<Appointment> li = aser.doctorAppointment(id);
		return li;
	}
	
	@PutMapping("/{id}/updateStatus")
	public ResponseEntity<String> editAppointment(@PathVariable int id, @RequestBody AppointmentUpdateDTO a) {
		String message =aser.updateAppointment(id,a);
		
		if(message.equals("Room is full! Cannot move the appointment.")) {
			return new ResponseEntity<String>("Room is Full",HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<String>("Room is Full",HttpStatus.OK);
	}
	
	@GetMapping("/{id}/getAppointmentById")
	public String getAppointment(@PathVariable int id) {
		aser.getAllAppointment(id);
		return "Update Appointment Successfully!";
	}
	
	@GetMapping("/admittedCount")
	public Long admittedCount() {
		Long cnt = aser.admitCnt();
		return cnt;
	}
 }
