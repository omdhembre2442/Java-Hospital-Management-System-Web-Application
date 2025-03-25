package com.example.demo.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.History;

@Repository
public interface HistoryRepo extends CrudRepository<History, Integer> {

	List<History> findByPatient_Id(int id);

}
