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
    (async () => {
      const hospitalManager = await HospitalManager.create(testUserId);
      console.log("avaialable rooms: "+ hospitalManager.getAvailableRooms());
      hospitalManager.addHospitalRoom("NewRoom 156");
      console.log("avaialable rooms: "+ hospitalManager.getAvailableRooms());
  })();


  }, []);

  return (
    <div>
      <h1>Test Hospital Manager</h1>
    </div>
  );
}

export default TestHospitalManager;
