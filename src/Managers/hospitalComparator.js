const { getDocs, query, where } = require('firebase/firestore');
const { db } = require("../Components/FireBase/Config.js");
const { getHospitals } = require('./getHospitals.js'); // Import getHospitals from getHospitals.js

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
  
    for (let searchHospital of searchHospitals) {
      for (let firebaseHospital of firebaseHospitals) {
        const distance = Math.hypot(
          firebaseHospital.latitude - searchHospital.latitude,
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
  
async function getIntersection(origin) {
  // Step 1: Fetch hospitals from Firebase within 50km of the origin
  const geofirestore = require('geofirestore');
  const GeoFirestore = geofirestore.initializeApp(db);  
    const hospitalCollection = GeoFirestore.collection('Hospital');
    const nearbyQuery = hospitalCollection.near({
        center: new geofirestore.GeoPoint(origin.lat, origin.lng),
        radius: 50
    });
    
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
