import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { FaHospital, FaPencilAlt, FaMapMarkedAlt } from "react-icons/fa";
import { FaInfinity } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

function HospitalProfile({ accountStateCheck }) {
  const [formData, setFormData] = useState({
    hospitalName: "",
    hospitalAddress: "",
    totalCapacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'totalCapacity' ? parseInt(value, 10) : value,
    }));
};



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      hospitalAddress: value,
    }));
  };  

  return (
    <div className="hospital-profile h-[calc(100vh-84px)] bg-night flex flex-col items-center justify-center p-8 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-lg w-[80%] md:w-[50%] lg:w-[40%]"
      >
        <h1 className="text-2xl font-bold text-gray-200 mb-6">
          {accountStateCheck ? "Hospital Profile" : "Create a Hospital"}
        </h1>
        <div className="mb-4">
          <label htmlFor="hospitalName" className="block text-gray-400 mb-2">
            <AiFillEdit className="w-6 h-6 inline-block -mt-1 mr-2" /> Hospital
            Name:
          </label>
          <input
            type="text"
            id="hospitalName"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hospitalAddress" className="block text-gray-400 mb-2">
            <FaMapMarkedAlt className="w-6 h-6 inline-block -mt-1 mr-2" />{" "}
            Hospital Address:
          </label>
          <PlacesAutocomplete
            value={formData.hospitalAddress}
            onChange={handleSelect}
            required
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input required
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className:
                      "w-full p-2 border border-gray-700 rounded focus:outline-none",
                  })}
                />
                <div>
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? { backgroundColor: "#41b6e6", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className="mb-4">
          <label htmlFor="totalCapacity" className="block text-gray-400 mb-2">
            <FaInfinity className="w-6 h-6 inline-block -mt-1 mr-2" /> Total
            Capacity:
          </label>
          <input
            type="number"
            id="totalCapacity"
            name="totalCapacity"  
            value={formData.totalCapacity}  
            onChange={handleChange}
            min="0"
            className="w-full p-2 border border-gray-700 rounded"
            required  
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-3 rounded hover:bg-blue-600 transition duration-300"
        >
          {accountStateCheck ? (
            <div className={"flex justify-center items-center gap-3"}>
              <FaHospital fontSize={23} />
              <h1>Hospital Profile</h1>
            </div>
          ) : (
            <div className={"flex justify-center items-center gap-3 "}>
              <FaPencilAlt fontSize={25} />
              <h1>Create a Hospital</h1>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}

export default HospitalProfile;
