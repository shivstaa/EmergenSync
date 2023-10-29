const axios = require("axios");
const api_key = "AIzaSyB29yN9o9YQdUNc8BcepzN5RmjD4e3dBV4"; // Please replace with your actual API key

// Function to get nearby hospitals using Google Places API
async function getNearbyHospitals(latitude, longitude) {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${latitude},${longitude}`,
          radius: 48280, // 30 miles in meters
          keyword: "hospital",
          key: api_key,
        },
      }
    );
    const hospitals = response.data.results.map((hospital) => ({
      ...hospital,
      photoUrl:
        hospital.photos && hospital.photos.length > 0
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1800&photoreference=${hospital.photos[0].photo_reference}&key=${api_key}`
          : null,
    }));
    return hospitals;
  } catch (error) {
    console.error("Error getting nearby hospitals: ", error);
    throw error;
  }
}

// Main function to get a list of hospitals within 30 miles of a given address
async function getHospitals(location) {
  try {
    const hospitals = await getNearbyHospitals(location.lat, location.lng);
    return hospitals;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

// Function to get distance and time from user location to hospitals
async function getDistanceAndTime(origin, destinations, hospitalDetails) {
  const formattedUserLocation = `${origin.lat},${origin.lng}`; // Adjusted this line to use the origin parameter
  const formattedDestinations = destinations.join("|"); // destinations is already an array of addresses
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    formattedUserLocation
  )}&destinations=${encodeURIComponent(
    formattedDestinations
  )}&units=imperial&key=${api_key}`;
  try {
    const response = await axios.get(url);
    const { rows } = response.data;
    const elements = rows[0].elements;
    return destinations.map((address, index) => {
      const { distance, duration } = elements[index];
      const hospital = hospitalDetails[index];
      return {
        hospital_name: hospital.name,
        hospital_address: address,
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        distanceFromAddr: distance.text,
        travelTime: duration.text,
        photoUrl: hospital.photoUrl
      };
    });
  } catch (error) {
    console.error("Error getting distance and time: ", error);
  }
}

module.exports = { getNearbyHospitals, getDistanceAndTime, getHospitals };
