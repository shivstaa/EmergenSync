const axios = require('axios');
const api_key = "AIzaSyB29yN9o9YQdUNc8BcepzN5RmjD4e3dBV4";  // Please replace with your actual API key

// Function to geocode address using Google Maps Geocoding API
async function geocodeAddress(address) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: api_key
      }
    });
    const location = response.data.results[0].geometry.location;
    return location;
  } catch (error) {
    console.error('Error geocoding address: ', error);
    throw error;
  }
}

// Function to get nearby hospitals using Google Places API
async function getNearbyHospitals(latitude, longitude) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${latitude},${longitude}`,
          radius: 48280,  // 30 miles in meters
          keyword: 'hospital',
          key: api_key
        }
      });
      const hospitals = response.data.results;
      return hospitals;
    } catch (error) {
      console.error('Error getting nearby hospitals: ', error);
      throw error;
    }
  }

// Main function to get a list of hospitals within 30 miles of a given address
async function getHospitals(location) {
    try {
      const hospitals = await getNearbyHospitals(location.lat, location.lng);
      return hospitals;
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  }

// Function to get distance and time from user location to hospitals
async function getDistanceAndTime(origin, destinations, hospitalDetails) {
    const formattedUserLocation = `${origin.lat},${origin.lng}`;  // Adjusted this line to use the origin parameter
    const formattedDestinations = destinations.join('|');  // destinations is already an array of addresses
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(formattedUserLocation)}&destinations=${encodeURIComponent(formattedDestinations)}&units=imperial&key=${api_key}`;
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
                travelTime: duration.text
            };
        });
    } catch (error) {
        console.error('Error getting distance and time: ', error);
    }
}


module.exports = {getNearbyHospitals, getDistanceAndTime,  getHospitals };
