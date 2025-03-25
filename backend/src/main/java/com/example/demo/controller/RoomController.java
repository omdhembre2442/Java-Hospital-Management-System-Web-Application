package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Room;
import com.example.demo.services.RoomSer;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/room")
@CrossOrigin
public class RoomController {

	@Autowired
	RoomSer rser;
	
	@PostMapping("/addRoom")
	public ResponseEntity<String> addRoom(@RequestBody Room room) {
		rser.saveRoom(room);
		
		return new ResponseEntity<String>("Room added Successfully!",HttpStatus.OK);
	}
	
	@GetMapping("/getAllRoom")
	public List<Room> getAllRoom(){
		List<Room> li = rser.getAll();
		return li;
	}
	
	@GetMapping("/availableRooms/{category}")
	public List<Room> getAvailableRoom(@PathVariable String category){
		List<Room> li = rser.getRoom(category);
		return li;
	}
	
	@GetMapping("/roomCount")
	public Long count() {
		Long cnt = rser.roomCnt();
		return cnt;
	}
	
	@GetMapping("/bedCount")
	public Integer bedcount() {
		Integer cnt = rser.bedsCnt();
		return cnt;
	}
	
}
