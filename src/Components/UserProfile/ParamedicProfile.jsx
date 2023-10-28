import React, { useState } from "react";
import { FaUserMd, FaPhone } from "react-icons/fa";
import InputMask from "react-input-mask";
import statesHash from './states_hash.json';  // Import the JSON file
import Select from 'react-select';  // Import react-select

function ParamedicProfile({ accountStateCheck }) {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paramedicFirstName: "",
    paramedicLastName: "",
    paramedicPhone: "",
    paramedicState: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // Function to handle state selection change
  const handleStateChange = (selectedOption) => {
    setFormData(prevData => ({
      ...prevData,
      paramedicState: selectedOption.value
    }));
  }

  // const handleRequestCreation = () => {
  //   navigate("/request");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  // Prepare options for the state dropdown
  const stateOptions = Object.keys(statesHash).map((stateCode) => ({
    value: stateCode,
    label: stateCode
  }));

  return (
    <div className="paramedic-profile h-screen bg-night flex flex-col items-center justify-center p-8 w-full">
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg w-[80%] md:w-[50%] lg:w-[40%]">
        <h1 className="text-2xl font-bold text-gray-200 mb-6">
          {accountStateCheck ? "Paramedic Profile" : "Create Paramedic Profile"}
        </h1>

        <div className="flex justify-between mb-4">
          <div className="mr-2 w-1/2">
            <label htmlFor="paramedicFirstName" className="block text-gray-400 mb-2">
              <FaUserMd className="w-6 h-6 inline-block -mt-1 mr-2" /> First Name
            </label>
            <input
              type="text"
              id="paramedicFirstName"
              name="paramedicFirstName"
              value={formData.paramedicFirstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="ml-2 w-1/2">
            <label htmlFor="paramedicLastName" className="block text-gray-400 mb-2">
              Last Name
            </label>
            <input type="text"
              id="paramedicLastName"
              name="paramedicLastName"
              value={formData.paramedicLastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="paramedicPhone" className="block text-gray-400 mb-2">
            <FaPhone className="w-6 h-6 inline-block -mt-1 mr-2" /> Phone
          </label>
          <InputMask
            mask="(999)-999-9999"
            id="paramedicPhone"
            name="paramedicPhone"
            placeholder="(___) ___-____"
            value={formData.paramedicPhone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paramedicState" className="block text-gray-400 mb-2">State</label>
          <Select
            id="paramedicState"
            name="paramedicState"
            value={stateOptions.find(option => option.value === formData.paramedicState)}
            onChange={handleStateChange}
            options={stateOptions}
            menuPlacement="bottom"  
            className="caret-transparent w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-3 rounded hover:bg-blue-600 transition duration-300"
        >
          {accountStateCheck ? (
            <div className={"flex justify-center items-center gap-3"}>
              {/* <FaHospital fontSize={23} /> */}
              <h1>Paramedic Profile</h1>
            </div>
          ) : (
            <div className={"flex justify-center items-center gap-3 "}>
              {/* <FaPencilAlt fontSize={25} /> */}
              <h1>Create a Paramedic Profile</h1>
            </div>
          )}
        </button>
      </form>
    </div>
    
  );
}

export default ParamedicProfile;
