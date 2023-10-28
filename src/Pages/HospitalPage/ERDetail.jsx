import React from "react";
import "./ERDetail.css";

function ERDetail({ roomsAvailable, roomsUnavailable }) {
  return (
    <div className="bg-gray-800 h-[calc(100vh-84px)] flex flex-col px-5 py-2">
      <div className="mb-12">
        <h1 className="text-2xl text-white mb-4 font-bold">
          San Francisco Hospital
        </h1>
        <div className="text-gray-200 space-y-4">
          <div className="text-xl">
            Rooms Available:{" "}
            <span className="text-green-500 font-bold">{roomsAvailable}</span>
          </div>
          <hr className="border-white" />
          <div className="text-xl">
            Rooms Hold: <span className="text-yellow-500 font-bold">2</span>
          </div>
          <hr className="border-white" />
          <div className="text-xl">
            Rooms Closed:{" "}
            <span className="text-red-500 font-bold">{roomsUnavailable}</span>
          </div>
        </div>
      </div>

      <h1 className="text-white font-bold text-xl mb-4">Live Updates:</h1>

      <div className="text-white overflow-y-scroll custom-scrollbar">
        <div className="border-2 border-white px-4 py-2 mb-2">
          <div className="flex justify-between">
            <h2 className="font-bold">Room 2</h2>
            <button className="text-green-500">Requested</button>
          </div>
          <p className="text-sm text-gray-400">
            Last Updated: 2023-10-28 14:30:00
          </p>
        </div>

        <div className="border-2 border-white px-4 py-2 mb-2">
          <div className="flex justify-between">
            <h2 className="font-bold">Room 3</h2>
            <button className="text-green-500">Occupied</button>
          </div>
          <p className="text-sm text-gray-400">
            Last Updated: 2023-10-28 15:45:00
          </p>
        </div>

        <div className="border-2 border-white px-4 py-2 mb-2">
          <div className="flex justify-between">
            <h2 className="font-bold">Room 3</h2>
            <button className="text-green-500">Occupied</button>
          </div>
          <p className="text-sm text-gray-400">
            Last Updated: 2023-10-28 15:45:00
          </p>
        </div>

        <div className="border-2 border-white px-4 py-2 mb-2">
          <div className="flex justify-between">
            <h2 className="font-bold">Room 3</h2>
            <button className="text-green-500">Occupied</button>
          </div>
          <p className="text-sm text-gray-400">
            Last Updated: 2023-10-28 15:45:00
          </p>
        </div>

        <div className="border-2 border-white px-4 py-2 mb-2">
          <div className="flex justify-between">
            <h2 className="font-bold">Room 3</h2>
            <button className="text-green-500">Occupied</button>
          </div>
          <p className="text-sm text-gray-400">
            Last Updated: 2023-10-28 15:45:00
          </p>
        </div>

        {/* Add more live updates as needed */}
      </div>
    </div>
  );
}

export default ERDetail;
