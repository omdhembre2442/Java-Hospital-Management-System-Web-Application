package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Room;

@Repository
public interface RoomRepo extends CrudRepository<Room, Integer>{

	@Query("SELECT COUNT(a) FROM Appointment a WHERE a.room.id = :roomId")
    int countActiveAppointmentsByRoomId(int roomId);
	
	 @Query("SELECT SUM(r.capacity) FROM Room r")
	 Integer getTotalCapacity();
	 
	List<Room> findByRoomType(String category);

	Room findAllByRoomNumber(String roomNumber);
}
