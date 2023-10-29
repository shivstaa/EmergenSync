import ERDetail from "./ERDetail";
import Rooms from "./Rooms";
import RoomDetails from "./RoomDetails";
import { useState } from "react";

function DashBoard() {

  const [rooms, setRooms] = useState([
    {
      roomName: "Room 1",
      name: "John Doe",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      severity: 7,
      roomActive: true,
    },
    {
      roomName: "Room 2",
      name: "Jane Smith",
      dateOfBirth: "1985-12-30",
      gender: "Female",
      severity: 5,
      roomActive: false,
    },
    {
      roomName: "Room 3",
      name: "Robert Johnson",
      dateOfBirth: "2000-08-10",
      gender: "Male",
      severity: 8,
      roomActive: true,
    },
    {
      roomName: "Room 4",
      name: "Alice Brown",
      dateOfBirth: "1995-03-22",
      gender: "Female",
      severity: 6,
      roomActive: true,
    },
    {
      roomName: "Room 1",
      name: "John Doe",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      severity: 7,
      roomActive: true,
    },
    {
      roomName: "Room 2",
      name: "Jane Smith",
      dateOfBirth: "1985-12-30",
      gender: "Female",
      severity: 5,
      roomActive: false,
    },
    {
      roomName: "Room 3",
      name: "Robert Johnson",
      dateOfBirth: "2000-08-10",
      gender: "Male",
      severity: 8,
      roomActive: true,
    },
    {
      roomName: "Room 4",
      name: "Alice Brown",
      dateOfBirth: "1995-03-22",
      gender: "Female",
      severity: 6,
      roomActive: true,
    },
  ]);

  const toggleRoomActive = (roomName) => {
    const updatedRooms = rooms.map((room) => {
      if (room.roomName === roomName) {
        return { ...room, roomActive: !room.roomActive };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const roomsAvailable = rooms.filter((room) => room.roomActive === true);
  const roomsUnavailable = rooms.filter((room) => room.roomActive === false);

  return (
    <div className={"flex bg-night"}>
      <ERDetail
        roomsAvailable={roomsAvailable.length}
        roomsUnavailable={roomsUnavailable.length}
      />
      <Rooms roomData={rooms} toggleRoomActive={toggleRoomActive} />
    </div>
  );
}

export default DashBoard;
