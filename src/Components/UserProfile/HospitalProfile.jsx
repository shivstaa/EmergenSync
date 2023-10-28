
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import {FaMapLocationDot, FaInfinity, FaStar, FaFilePen} from "react-icons/fa6"
import {FaHeadSideMask} from "react-icons/fa";

function HospitalProfile({accountStateCheck}) {

    const [formData, setFormData] = useState({
        hospitalName: '',
        hospitalAddress: '',
        totalCapacity: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission using formData object
        console.log('Form Data:', formData);
    };

    return (
        <div className="hospital-profile h-[calc(100vh-84px)] flex flex-col items-center justify-center p-8 w-full">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded shadow-lg w-[80%] md:w-[50%] lg:w-[40%]">
                <h1 className="text-2xl font-bold text-gray-200 mb-6">
                    {accountStateCheck ? "Hospital Profile" : "Create a Hospital"}
                </h1>
                <div className="mb-4">
                    <label htmlFor="hospitalName" className="block text-gray-400 mb-2">
                        <AiFillEdit className="w-6 h-6 inline-block -mt-1 mr-2" /> Hospital Name:
                    </label>
                    <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="hospitalAddress" className="block text-gray-400 mb-2">
                        <FaMapLocationDot className="w-6 h-6 inline-block -mt-1 mr-2" /> Hospital Address:
                    </label>
                    <input
                        type="text"
                        id="hospitalAddress"
                        name="hospitalAddress"
                        value={formData.hospitalAddress}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="totalCapacity" className="block text-gray-400 mb-2">
                        <FaInfinity className="w-6 h-6 inline-block -mt-1 mr-2" /> Total Capacity:
                    </label>
                    <input
                        type="number"
                        id="totalCapacity"
                        name="totalCapacity"
                        value={formData.totalCapacity}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white w-full py-3 rounded hover:bg-blue-600 transition duration-300">
                    {accountStateCheck ?
                        <>
                            <div className={"flex justify-center items-center gap-3"}>
                                <FaHeadSideMask fontSize={23}/>
                                <h1>Hospital Profile</h1>
                            </div>
                        </>
                        :
                        <div className={"flex justify-center items-center gap-3 "}>
                            <FaFilePen fontSize={25}/>
                            <h1>Create a Hospital</h1>
                        </div>
                    }
                </button>
            </form>
        </div>
    );
}

export default HospitalProfile;
