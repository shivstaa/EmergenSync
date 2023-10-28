import React, { useState } from "react";
import RoomDetails from "./RoomDetails";

function Rooms({ roomData, toggleRoomActive }) {
  return (
    <div className="flex">
      <div className="">
        <div className="flex flex-wrap p-2">
          {roomData.map((room, index) => (
            <RoomDetails
              key={index}
              roomData={room}
              toggleRoomActive={toggleRoomActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
