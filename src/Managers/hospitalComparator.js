const { getDocs, collection, query, where } = require('firebase/firestore');
const { db } = require("./Config.js");
const { getHospitals } = require('./getHospitals.js'); // Import getHospitals from getHospitals.js
const geohash = require('ngeohash');  // Ensure you have the ngeohash package installed

async function getHospitalDetailsAndDistances(origin, hospitals) {
    const hospitalDetails = hospitals.map(hospital => ({
        name: hospital.name,
        address: hospital.vicinity,
        latitude: hospital.geometry.location.lat,
        longitude: hospital.geometry.location.lng
    }));
    const hospitalAddresses = hospitals.map(hospital => hospital.vicinity);
    return await getDistanceAndTime(origin, hospitalAddresses, hospitalDetails);
}


async function findIntersection(firebaseHospitals, searchHospitals) {
    const intersectedHospitals = [];
    console.log("Search ", searchHospitals[0]);
    console.log("firebase ", firebaseHospitals[0]);
    for (let searchHospital of searchHospitals) {
      for (let firebaseHospital of firebaseHospitals) {
        const distance = Math.hypot(
          firebaseHospital.lat - searchHospital.latitude,
          firebaseHospital.longitude - searchHospital.longitude
        );
  
        const isSameHospital = distance < 0.0002844; // distance in degrees for approx 1000 ft
        if (isSameHospital) {
          intersectedHospitals.push(firebaseHospital);
        }
      }
    }
  
    return intersectedHospitals;
  }
  

function getBoundingBox(latitude, longitude, distanceInKm) {
    const earthRadius = 6371;  // Earth radius in km
    const deltaLat = (distanceInKm / earthRadius) * (180 / Math.PI);
    const deltaLng = (distanceInKm / (earthRadius * Math.cos((Math.PI / 180) * latitude))) * (180 / Math.PI);

    const minLat = latitude - deltaLat;
    const maxLat = latitude + deltaLat;
    const minLng = longitude - deltaLng;
    const maxLng = longitude + deltaLng;

    const minGeohash = geohash.encode(minLat, minLng);
    const maxGeohash = geohash.encode(maxLat, maxLng);

    return {
        minGeohash,
        maxGeohash
    };
}

async function getIntersection(origin) {
  // Step 1: Fetch hospitals from Firebase within 50km of the origin
   const hospitalCollection = collection(db, 'Hospital');
  const boundingBox = getBoundingBox(origin.lat, origin.lng, 50);  // Assume getBoundingBox is a function to get the bounding box
  const nearbyQuery = hospitalCollection.where('geohash', '>=', boundingBox.minGeohash).where('geohash', '<=', boundingBox.maxGeohash);
  
  const firebaseHospitalsSnap = await getDocs(nearbyQuery);
  const firebaseHospitals = firebaseHospitalsSnap.docs.map(doc => doc.data());

  // Step 2: Fetch hospitals from the Google Places API
  const searchHospitals = await getHospitals(origin);  // Assuming getHospitals is defined
  const detailsAndDistances = await getHospitalDetailsAndDistances(origin, searchHospitals);

  // Step 3: Find the intersection of the two sets
  const intersectedHospitals = await findIntersection(firebaseHospitals, detailsAndDistances);

  return intersectedHospitals;
}

const origin = {
    latitude: 37.7895567,
    longitude: -122.416863
};

getIntersection(origin)
    .then(intersectedHospitals => {
        console.log(intersectedHospitals);
    })
    .catch(error => console.error(error));

module.exports = { getIntersection };
