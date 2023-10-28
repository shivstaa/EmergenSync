import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function HospitalProfile() {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setHospitalAddress(value);
    console.log("Coordinates:", latLng);
  };

  return (
    <div className="hospital-profile bg-gray-900 min-h-screen flex items-center justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-night p-6 rounded shadow-lg w-[45vw]"
      >
        <div className="mb-4">
          <label htmlFor="hospitalName" className="block text-white mb-2">
            Hospital Name:
          </label>
          <input
            type="text"
            id="hospitalName"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Hospital Address:</label>
          <PlacesAutocomplete
            value={hospitalAddress}
            onChange={setHospitalAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "w-full p-2 border border-gray-700 rounded",
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
          <label htmlFor="totalCapacity" className="block text-white mb-2">
            Total Capacity:
          </label>
          <input
            type="number"
            id="totalCapacity"
            value={totalCapacity}
            onChange={(e) => setTotalCapacity(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white w-full px-4 py-2 rounded hover:bg-gray-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default HospitalProfile;
