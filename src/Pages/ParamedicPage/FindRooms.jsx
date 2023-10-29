import React, { useState, useRef, useEffect } from "react";
import {getIntersection} from '../../Managers/hospitalComparator'

const FindRoom = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This function gets the user's location and fetches hospital data
        const fetchData = async () => {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
    
            const hospitals = await getIntersection({ lat: latitude, lng: longitude });
            console.log("Received data: ", hospitals)
            setData(hospitals);
            setLoading(false);
          }, (error) => {
            console.error("Error getting location", error);
            setLoading(false);
          });
        };
    
        fetchData();
      }, []);

      if (loading) {
        return <div>Loading...</div>; // Or any other loading component you might have
      }
    
      if (!data || data.length === 0) {
        return <div>No hospitals found</div>;
      }
//   const data = {
//     0: {
//       hospitalName: "Allegra Hospital",
//       address: "13494 Allegra Royale Ave, Tempe, AZ",
//       distance: 0.2,
//       estimatedTime: 15,
//       thumbnail: "image_url",
//       rooms_available: 45,
//       rooms_reserved: 5,
//       rooms_used: 18,
//     },
//     1: {
//       hospitalName: "Habitual Hospital",
//       address: "13494 Allegra Royale Ave, Tempe, AZ",
//       distance: 0.2,
//       estimatedTime: 25,
//       thumbnail:
//         "https://wehco.media.clients.ellingtoncms.com/img/photos/2022/01/20/PB1_hospital_0121.jpg",
//       rooms_available: 45,
//       rooms_reserved: 5,
//       rooms_used: 18,
//     },
    // ... more data
//  };
  

  const HospitalComponent = ({ hospitalData }) => {
    const [showForm, setShowForm] = useState(false);
    const [titleWidth, setTitleWidth] = useState("auto");
    const titleRef = useRef(null);

    // form management
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [patientPain, setPatientPain] = useState("");
    const [sex, setSex] = useState(""); // state for Sex
    const [dob, setDob] = useState(""); // state for Date of Birth


    useEffect(() => {
      if (titleRef.current) {
        setTitleWidth(titleRef.current.offsetWidth);
      }
    }, []);

    // Helper function to determine the background color based on the estimatedTime
    const determineBackgroundColor = (time) => {
      if (time <= 15) return "bg-green-500";
      if (time <= 35) return "bg-orange-500";
      return "bg-red-500";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (patientPain < 1 || patientPain > 10) {
          alert("Patient Pain must be between 1 and 10.");
          return;
        }
        const formData = {
          hospital: hospitalData.hospitalName,
          firstName: firstName,
          lastName: lastName,
          patientPain: parseInt(patientPain), 
          dob: dob,
          sex: sex,
        };
        console.log("Form Data:", formData);
      };


    return (
      <div className="relative mb-6 w-fit mx-auto">
        <div
          className="p-6 border rounded-md bg-gray-800 text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          <h1 ref={titleRef} className="text-2xl font-bold mb-2">
            {hospitalData.hospitalName}
          </h1>
          <p className="mb-4">{hospitalData.address}</p>

          <div className="flex items-center justify-between">
            {/* Left side with image */}
            <div className="mr-4">
              <img
                src={hospitalData.thumbnail}
                alt="Thumbnail"
                className="w-full object-cover"
                style={{
                  maxWidth: "300px",
                  maxHeight: "200px",
                  width: titleWidth,
                }}
              />
            </div>

            {/* Right side with details */}
            <div className="flex-1 flex gap-x-4">
              {/* Moved the ETA tag */}
              <span
                className={`absolute top-4 right-4 font-bold py-1 px-4 rounded-full text-white ${determineBackgroundColor(
                  hospitalData.estimatedTime,
                )}`}
              >
                ETA: {hospitalData.estimatedTime} min
              </span>
            </div>
          </div>

          {/* Room details */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            <p>
              Rooms Available:{" "}
              <span className="font-bold text-green-300">
                {hospitalData.rooms_available}
              </span>
            </p>
            <p>
              Rooms Reserved:{" "}
              <span className="font-bold text-orange-300">
                {hospitalData.rooms_reserved}
              </span>
            </p>
            <p>
              Rooms Occupied:{" "}
              <span className="font-bold text-red-300">
                {hospitalData.rooms_used}
              </span>
            </p>
            <div className="mr-0">
              {" "}
              {/* Remove margin/padding to the right */}
              <p>
                Distance:{" "}
                <span className="font-bold">{hospitalData.distance} mi</span>
              </p>
            </div>
          </div>
        </div>
        {showForm && (
            <div className="bg-gray-900 p-4 border rounded-md mt-4 text-white">
                <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold mb-2">Patient Information</h1>
              <label className="block mb-2">Hospital</label>
              <input
                type="text"
                className="border rounded p-2 w-full bg-gray-800"
                value={hospitalData.hospitalName}
                readOnly
              />
<div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                className="border rounded p-2 w-full bg-gray-800"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                className="border rounded p-2 w-full bg-gray-800"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            {/* Patient Pain Section */}
            <div className="flex-1">
              <label className="block mb-2">Patient Pain (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                className="border rounded p-2 w-full bg-gray-800"
                required
                value={patientPain}
                onChange={(e) => setPatientPain(e.target.value)}
              />
            </div>

                {/* Date of Birth Section */}
                <div className="flex-1">
                  <label className="block mb-2">
                    Date of Birth (DD/MM/YYYY)
                  </label>
                  <input
                    type="date"
                    className="border rounded p-2 w-full bg-gray-800"
                    required
                    value={dob}
                    placeholder="DD/MM/YYYY"
                    maxLength={10}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>

            {/* Sex Section */}
            <label className="block mb-2">Sex</label>
              <select 
                required
                className="border rounded p-2 w-full bg-gray-800"
                value={sex}
                onChange={(e) => setSex(e.target.value)}>
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
              >
                Submit Request
              </button>
            </form>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-900">
      {Object.values(data).map((item, index) => (
        <HospitalComponent key={index} hospitalData={item} />
      ))}
    </div>
  );
};

export default FindRoom;
