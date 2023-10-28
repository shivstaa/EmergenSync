// src/Components/TestHospitalManager.jsx

import React, { useEffect } from 'react';
import HospitalManager from '../../Managers/hospitalManager';
import UserManager from '../../Managers/userManager';

function TestHospitalManager() {

  useEffect(() => {
    // Replace with a valid user ID from your Firebase Authentication
    const testUserId = 'gvYYfcIIg6gRuBIFm8Z5phht2XT2';  
    // const userManager  = new UserManager();
    // console.log("new user: ", userManager.getUserType(testUserId));
    // Create an instance of HospitalManager
    const hospitalManager = new HospitalManager(testUserId);

    // Define hospital details
    const geolocation = { lat: 0, lon: 0 };  // Replace with actual geolocation
    const hospitalName = 'Test Hospital';
    const roomCapacity = 10;

    // Call createHospital method to add a new hospital
    hospitalManager.createHospital(testUserId, geolocation, hospitalName, roomCapacity)
      .then(() => {
        console.log('Hospital created successfully');
      })
      .catch(error => {
        console.error('Error creating hospital:', error);
      });
  }, []);

  return (
    <div>
      <h1>Test Hospital Manager</h1>
    </div>
  );
}

export default TestHospitalManager;
