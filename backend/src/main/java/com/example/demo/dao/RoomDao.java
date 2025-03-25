package com.example.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Room;
import com.example.demo.repo.RoomRepo;
import com.example.demo.services.RoomSer;

@Service
public class RoomDao implements RoomSer{
	
	@Autowired
	RoomRepo rrepo;

	@Override
	public void saveRoom(Room room) {
		Room room1 = rrepo.findAllByRoomNumber(room.getRoomNumber());
		
		if(room1.getRoomNumber()!=room.getRoomNumber() && room1.getRoomType()!=room.getRoomType() ) {
			rrepo.save(room);
		}
	}

	@Override
	public List<Room> getAll() {
		List<Room> rooms = (List<Room>) rrepo.findAll();
		
		for(Room room:rooms) {
			int filledCapacity = rrepo.countActiveAppointmentsByRoomId(room.getId());
			room.setFilledCapacity(filledCapacity);
			
			if (filledCapacity >= room.getCapacity()) {
	            room.setRoomStatus("Full");
	        } else if (filledCapacity > 0) {
	            room.setRoomStatus("Occupied");
	        } else {
	            room.setRoomStatus("Available");
	        }
			
			rrepo.save(room);
		}
		
		return rooms;
	}

	@Override
	public List<Room> getRoom(String category) {
		List<Room> li = rrepo.findByRoomType(category);
		return li;
	}

	@Override
	public Long roomCnt() {
		Long cnt = rrepo.count();
		return cnt;
	}

	@Override
	public Integer bedsCnt() {
		Integer cnt = rrepo.getTotalCapacity();
		return cnt;
	}
	

}
