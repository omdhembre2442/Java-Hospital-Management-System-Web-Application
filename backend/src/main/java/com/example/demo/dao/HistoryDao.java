package com.example.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.History;
import com.example.demo.repo.HistoryRepo;
import com.example.demo.services.HistorySer;

@Service
public class HistoryDao implements HistorySer{
	
	@Autowired
	HistoryRepo hrepo;

	@Override
	public List<History> pathistory(int id) {
		List<History> li = hrepo.findByPatient_Id(id);
		return li;
	}

}
