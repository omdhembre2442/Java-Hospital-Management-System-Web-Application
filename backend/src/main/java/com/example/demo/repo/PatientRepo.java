package com.example.demo.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Patient;

@Repository
public interface PatientRepo extends CrudRepository<Patient, Integer>{

	Patient findByEmail(String email);

	Patient findById(Patient patient);

}
