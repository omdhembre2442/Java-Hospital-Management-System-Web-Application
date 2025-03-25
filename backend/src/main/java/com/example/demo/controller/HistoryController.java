package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.History;
import com.example.demo.services.HistorySer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/history")
@CrossOrigin
public class HistoryController {
	
	@Autowired
	HistorySer hser;
	
	@GetMapping("/{id}/medicalHistory")
	public List<History> patientHistory(@PathVariable int id) {
		try {
	        List<History> historyList = hser.pathistory(id);
	        return (historyList != null) ? historyList : Collections.emptyList();
	    } catch (Exception e) {
	        e.printStackTrace(); 
	        return new ArrayList<>(); 
	    }
	}
	
}
