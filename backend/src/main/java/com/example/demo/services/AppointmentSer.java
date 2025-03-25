package com.example.demo.services;

import java.util.List;

import com.example.demo.entities.Appointment;
import com.example.demo.entities.AppointmentUpdateDTO;

public interface AppointmentSer {

	void addAppointment(Appointment a);

	List<Appointment> getall();

	void deleteAppointment(int id);

	Long appointCnt();

	List<Appointment> doctorAppointment(int id);

	String updateAppointment(int id, AppointmentUpdateDTO a);

	void getAllAppointment(int id);

	Long admitCnt();

}
