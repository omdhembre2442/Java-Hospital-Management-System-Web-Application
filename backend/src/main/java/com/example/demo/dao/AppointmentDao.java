package com.example.demo.dao;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Appointment;
import com.example.demo.entities.AppointmentUpdateDTO;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.History;
import com.example.demo.entities.Patient;
import com.example.demo.entities.Room;
import com.example.demo.repo.AppointmentRepo;
import com.example.demo.repo.DoctorRepo;
import com.example.demo.repo.HistoryRepo;
import com.example.demo.repo.PatientRepo;
import com.example.demo.repo.RoomRepo;
import com.example.demo.services.AppointmentSer;

@Service
public class AppointmentDao implements AppointmentSer {

	@Autowired
	AppointmentRepo arepo;
	
	@Autowired
	PatientRepo patrepo;
	
	@Autowired
	DoctorRepo docrepo;
	
	@Autowired
	HistoryRepo hisrepo;
	
	@Autowired
	RoomRepo roomrepo;
	
	@Override
	public void addAppointment(Appointment a) {
		  Patient p = patrepo.findById(a.getPatient().getId()).orElse(null);
		  Doctor d = docrepo.findById(a.getDoctor().getId()).orElse(null);

		    if (p != null && d != null) {
		        a.setPatient(p);
		        a.setDoctor(d);
		        arepo.save(a);
		    } else {
		        throw new RuntimeException("Invalid patient or doctor ID");
		    }
	}

	@Override
	public List<Appointment> getall() {
		List<Appointment> li = (List<Appointment>) arepo.findAll();
		return li;
	}

	@Override
	public void deleteAppointment(int id) {
		arepo.deleteById(id);
	}

	@Override
	public Long appointCnt() {
		Long cnt = arepo.count();
		return cnt;
	}

	@Override
	public List<Appointment> doctorAppointment(int id) {
		List<Appointment> li = arepo.findByDoctorId(id);
		return li;
	}

	@Override
	public String updateAppointment(int id, AppointmentUpdateDTO a) {
	    Appointment a1 = arepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Appointment not found!"));

	    Room r = null;
	    if (a.getRoomId() != null) {
	        r = roomrepo.findById(a.getRoomId())
	                .orElseThrow(() -> new RuntimeException("Room not found!"));
	    }

	    if (r != null && a1.getRoom() != null && a1.getRoom().getId() != (a.getRoomId())) {
	        int filledCapacity = roomrepo.countActiveAppointmentsByRoomId(r.getId());
	        if (filledCapacity >= r.getCapacity()) {
	            return "Room is full! Cannot move the appointment.";
	        }
	    }

	    a1.setStatus(a.getStatus());
	    a1.setNotes(a.getNotes());
	    a1.setMedication(a.getMedication());
	    a1.setTime(a1.getTime()); 
	    a1.setDate(a1.getDate());

	    if (r != null) {
	        a1.setRoom(r);
	    }

	    if ("Completed".equals(a1.getStatus()) || "Cancelled".equals(a1.getStatus())) {
	        History h = new History();
	        h.setPatient(a1.getPatient());
	        h.setDoctor(a1.getDoctor());
	        h.setDescrption(a1.getNotes());
	        h.setMedication(a1.getMedication());
	        h.setStatus(a1.getStatus());
	        hisrepo.save(h);
	        arepo.deleteById(id);
	        return "Appointment moved to history.";
	    } 

	    arepo.save(a1);
	    return "Appointment updated successfully!";
	}


	@Override
	public void getAllAppointment(int id) {
		arepo.findById(id);
	}

	@Override
	public Long admitCnt() {
		Long cnt = arepo.countByStatus("Admitted");
		return cnt;
	}

}
