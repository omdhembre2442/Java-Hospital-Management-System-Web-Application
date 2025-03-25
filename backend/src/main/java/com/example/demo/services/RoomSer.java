package com.example.demo.services;

import java.util.List;

import com.example.demo.entities.Room;

public interface RoomSer {

	void saveRoom(Room room);

	List<Room> getAll();

	List<Room> getRoom(String category);

	Long roomCnt();

	Integer bedsCnt();

}
