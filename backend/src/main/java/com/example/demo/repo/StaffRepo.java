package com.example.demo.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Staff;

@Repository
public interface StaffRepo extends CrudRepository<Staff, Integer>{

	Staff findByEmail(String email);

}
