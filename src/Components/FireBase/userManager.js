// UserManager.js
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, provider } from "./FireBase/Config";
import { getFirestore } from "firebase/firestore";

class UserManager {
  constructor() {
    this.db = getFirestore();
  }

  // Create or Update User Details
  async saveUserDetails(uid, userDetails) {
    const userRef = doc(this.db, 'Users', uid);
    try {
      await setDoc(userRef, userDetails, { merge: true });  // Merge true to update existing fields without overwriting
    } catch (error) {
      console.error('Error saving user details: ', error);
      throw error;
    }
  }

  // Read User Details
  async getUserDetails(uid) {
    const userRef = doc(this.db, 'Users', uid);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        throw new Error('User does not exist');
      }
    } catch (error) {
      console.error('Error getting user details: ', error);
      throw error;
    }
  }

  // Create or Update Emergency Request
  async saveEmergencyRequest(requestId, emergencyRequest) {
    const requestRef = doc(this.db, 'EmergencyRequests', requestId);
    try {
      await setDoc(requestRef, emergencyRequest, { merge: true });
    } catch (error) {
      console.error('Error saving emergency request: ', error);
      throw error;
    }
  }

  // Read Emergency Request
  async getEmergencyRequest(requestId) {
    const requestRef = doc(this.db, 'EmergencyRequests', requestId);
    try {
      const requestSnap = await getDoc(requestRef);
      if (requestSnap.exists()) {
        return requestSnap.data();
      } else {
        throw new Error('Emergency request does not exist');
      }
    } catch (error) {
      console.error('Error getting emergency request: ', error);
      throw error;
    }
  }

  // Additional methods for deleting users or emergency requests can be added here...
}

export default UserManager;
