import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";

const FindRoom = () => {
    
    const data = {
        0: {
        hospitalName: "Allegra Hospital",
        address: "13494 Allegra Royale Ave, Tempe, AZ",
        distance: 0.2,
        estimatedTime: 15,
        thumbnail: "https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg",
        rooms_available: 45,
        rooms_reserved: 5,
        rooms_used: 18,
        },
        1: {
        hospitalName: "Habitual Hospital",
        address: "13494 Allegra Royale Ave, Tempe, AZ",
        distance: 0.2,
        estimatedTime: 25,
        thumbnail:
            "https://wehco.media.clients.ellingtoncms.com/img/photos/2022/01/20/PB1_hospital_0121.jpg",
        rooms_available: 45,
        rooms_reserved: 5,
        rooms_used: 18,
        },
        2: {
            hospitalName: "Mercy General Hospital",
            address: "4001 J Street, Sacramento, CA",
            distance: 1.5,
            estimatedTime: 30,
            thumbnail: "https://www.ucsf.edu/sites/default/files/2021-12/New_Parnassus_Hospital_rendering_from_Hillway_social_card.jpg",
            rooms_available: 60,
            rooms_reserved: 10,
            rooms_used: 25,
        },
        3: {
            hospitalName: "Sunrise Hospital",
            address: "3186 S Maryland Pkwy, Las Vegas, NV",
            distance: 0.8,
            estimatedTime: 20,
            thumbnail: "https://www.medelita.com/media/wysiwyg/blog/Wayfinding_Hospitals.jpg",
            rooms_available: 75,
            rooms_reserved: 15,
            rooms_used: 30,
        },
        4: {
            hospitalName: "Providence Hospital",
            address: "1150 Varnum St NE, Washington, DC",
            distance: 2.0,
            estimatedTime: 40,
            thumbnail: "https://www.clarkpacific.com/wp-content/uploads/2016/09/1442_SFGeneral_STAR.jpg",
            rooms_available: 50,
            rooms_reserved: 8,
            rooms_used: 20,
        },
        5: {
            hospitalName: "Lakeview Hospital",
            address: "630 E Medical Dr, Bountiful, UT",
            distance: 1.2,
            estimatedTime: 25,
            thumbnail: "https://s3-prod.modernhealthcare.com/s3fs-public/styles/800x600/public/NEWS_180219951_AR_0_LZPHZNGBWJJQ.jpg",
            rooms_available: 40,
            rooms_reserved: 6,
            rooms_used: 15,
        },
        
    };
  

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
        // addPatientToRoom("TWYIhuJzsscNJRWEwRCkX0S2hkr2", formData.firstName + " " +  formData.lastName, formData.dob, formData.sex, formData.patientPain)
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
