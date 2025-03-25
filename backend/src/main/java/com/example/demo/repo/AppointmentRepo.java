package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Appointment;

@Repository
public interface AppointmentRepo extends CrudRepository<Appointment, Integer>{

	  @Query("SELECT COUNT(a) FROM Appointment a WHERE a.status = :status")
	  Long countByStatus(@Param("status") String status);

	List<Appointment> findByDoctorId(int id);

}
