
import React, { useState } from 'react';

function RoomDetails({ roomData, toggleRoomActive }) {

    const {roomName, name, dateOfBirth, gender, severity, roomActive } = roomData

    const [showDetail, setShowDetail] = useState(false)

    const openShowDetail = () => {
        setShowDetail(true);
    };

    const closeShowDetail = () => {
        setShowDetail(false);
    };



    const handleToggleRoomActive = () => {
        toggleRoomActive(roomName); // Call the toggleRoomActive function with the roomName
        closeShowDetail();
    };

    return (
        <React.Fragment>

            <button
                onClick={openShowDetail}
                className={`m-2 w-40 h-32 rounded cursor-pointer ${
                    roomActive ? 'bg-green-500' : 'bg-red-500'
                } flex flex-col justify-center items-center text-white transform transition-transform hover:scale-105`}
            >
                <span className="text-xl font-semibold">{roomName}</span>
            </button>

            {showDetail && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

                    <div className="modal-container bg-white w-96 p-4 rounded-lg shadow-lg z-50">
                        <h1 className="text-3xl font-extrabold">{roomName}</h1>
                        <hr className="my-2" />
                        <h2 className="text-2xl mb-2 font-semibold">Patient Information:</h2>

                        <div className="modal-content">
                            <p  className={"text-xl"}>
                                Name: <span>{name}</span>
                            </p>

                            <p  className={"text-xl "}>
                                <label>Date of Birth:</label> {dateOfBirth}
                            </p>

                            <p  className={"text-xl "}>
                                <label>Gender:</label> {gender}
                            </p>

                            <p  className={"text-xl"}>
                                <label>Severity (1-10):</label> {severity}
                            </p>
                        </div>
                        <div className="modal-actions mt-4 flex">
                            <button
                                className={`w-full modal-button ${roomActive ? 'bg-red-500' : 'bg-green-500'} text-white px-4 py-2 rounded mr-2`}
                                onClick={handleToggleRoomActive}
                            >
                                {roomActive ? 'Close Room' : 'Open Room'}
                            </button>
                            <button
                                className="w-full modal-button bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={closeShowDetail}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default RoomDetails;
