// const log = require('why-is-node-running') // should be your first require
// const net = require('net')

const { getDocs, collection, query, where } = require("firebase/firestore");
const { db } = require("./Config.js");
const {
  getHospitals,
  getDistanceAndTime,
} = require("./getHospitals.js"); // Import getHospitals from getHospitals.js
const geohash = require("ngeohash"); // Ensure you have the ngeohash package installed

async function getHospitalDetailsAndDistances(origin, hospitals) {
  const hospitalDetails = hospitals.map((hospital) => ({
    name: hospital.name,
    address: hospital.vicinity,
    latitude: hospital.geometry.location.lat,
    longitude: hospital.geometry.location.lng,
    photoUrl: hospital.photoUrl,
  }));
  // console.log("first")
  const hospitalAddresses = hospitals.map((hospital) => hospital.vicinity);
  // console.log("hospital details", hospitalDetails);
  return await getDistanceAndTime(origin, hospitalAddresses, hospitalDetails);
}

async function findIntersection(firebaseHospitals, searchHospitals) {
  const intersectedHospitals = [];
  for (let searchHospital of searchHospitals) {
    for (let firebaseHospital of firebaseHospitals) {
      const distance = Math.hypot(
        firebaseHospital.geoLocation.lat - searchHospital.latitude,
        firebaseHospital.geoLocation.lng - searchHospital.longitude
      );

      const isSameHospital = distance < 0.0002844; // distance in degrees for approx 1000 ft
      if (isSameHospital) {
        // console.log("SAME ENCOUNTER", searchHospital);
        intersectedHospitals.push({
          ...firebaseHospital,
          distanceFromAddr: searchHospital.distanceFromAddr,
          travelTime: searchHospital.travelTime,
          photoUrl: searchHospital.photoUrl,
        });
      }
    }
  }

  return intersectedHospitals.filter(
    (item, index) => intersectedHospitals.indexOf(item) === index
  );
}

function getBoundingBox(latitude, longitude, distanceInKm) {
  const earthRadius = 6371; // Earth radius in km
  const deltaLat = (distanceInKm / earthRadius) * (180 / Math.PI);
  const deltaLng =
    (distanceInKm / (earthRadius * Math.cos((Math.PI / 180) * latitude))) *
    (180 / Math.PI);

  const minLat = latitude - deltaLat;
  const maxLat = latitude + deltaLat;
  const minLng = longitude - deltaLng;
  const maxLng = longitude + deltaLng;

  const minGeohash = geohash.encode(minLat, minLng);
  const maxGeohash = geohash.encode(maxLat, maxLng);

  return {
    minGeohash,
    maxGeohash,
  };
}

async function getIntersection(origin) {
  // Step 1: Fetch hospitals from Firebase within 50km of the origin
  const hospitalCollection = collection(db, "Hospital");
  const boundingBox = getBoundingBox(origin.lat, origin.lng, 50);
  const nearbyQuery = query(
    hospitalCollection,
    where("geoHash", ">=", boundingBox.minGeohash),
    where("geoHash", "<=", boundingBox.maxGeohash)
  );

  const firebaseHospitalsSnap = await getDocs(nearbyQuery);
  const firebaseHospitals = firebaseHospitalsSnap.docs.map((doc) => doc.data());
  // console.log("Firebase hospitals that fall under the query: ", firebaseHospitals);
  // Step 2: Fetch hospitals from the Google Places API
  const searchHospitals = await getHospitals(origin); // Assuming getHospitals is defined
  const detailsAndDistances = await getHospitalDetailsAndDistances(
    origin,
    searchHospitals
  );
  // console.log("Search Results from the origin", detailsAndDistances);
  // Step 3: Find the intersection of the two sets

  const intersectedHospitals = await findIntersection(
    firebaseHospitals,
    detailsAndDistances
  );

  return intersectedHospitals;
}

const origin = {
  lat: 37.7895567,
  lng: -122.416863,
};

getIntersection(origin)
  .then((intersectedHospitals) => {
    console.log(intersectedHospitals);
  }).catch((error) => console.error(error));

module.exports = { getIntersection };

// setTimeout(function () {
//   log() // logs out active handles that are keeping node running
// }, 1000)