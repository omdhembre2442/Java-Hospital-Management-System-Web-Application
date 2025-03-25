package com.example.demo.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Doctor;

@Repository
public interface DoctorRepo extends CrudRepository<Doctor, Integer>{

	Doctor findByEmail(String email);

	Doctor findById(Doctor doctor);

}
