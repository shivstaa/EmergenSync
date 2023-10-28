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

  async addHospitalRoom(uid, roomId, roomName) {
    const userRef = doc(this.db, 'Users', uid);
    try {
      await updateDoc(userRef, {
        rooms: [...rooms, { roomId: roomId, roomName: roomName, availability: true }]
      });

    } catch (error) {
      console.error('Error adding hospital room: ', error);
      throw error;
    }
  }

  async changeRoomAvailability(uid, roomId) {
    const userRef = doc(this.db, 'Users', uid);
    try {
      await updateDoc(userRef, {
        rooms: [...rooms, { roomId: roomId, roomName: roomName, availability: !availability }]
      });

    } catch (error) {
      console.error('Error changing room availability: ', error);
      throw error;
    }
  }

  async deleteHospitalRoom(uid, roomId) {
    const userRef = doc(this.db, 'Users', uid);
    try {
      await updateDoc(userRef, {
        rooms: [...rooms.filter(room => room.roomId !== roomId)]
      });

    } catch (error) {
      console.error('Error deleting hospital room: ', error);
      throw error;
    }
  }

  async createRequest(uid, patientName, patientPain) {
    const userRef = doc(this.db, 'Users', uid);

    try {
      const geolocation = userRef.geolocation;
      let distance = Infinity;
      let nearestHospital = null;

      const querySnapshot = await this.db.collection('Users')
        .where('type', '==', 'Hospital')
        .where('availability', '==', true)
        .get();

      querySnapshot.forEach((doc) => {
        const dist_to_hospital = Math.sqrt(
          (geolocation.latitude - doc.data().geolocation.latitude) ** 2 +
          (geolocation.longitude - doc.data().geolocation.longitude) ** 2
        );

        if (dist_to_hospital < distance) {
          distance = dist_to_hospital;
          nearestHospital = doc;
        }
      });

      if (!nearestHospital) {
        throw new Error('No available hospitals found.');
      }

      const hospitalRef = doc(this.db, 'Users', nearestHospital.id);

      if (!hospitalRef.availability) {
        throw new Error('Hospital is not available');
      }

      await updateDoc(hospitalRef, { availability: false });
    } catch (error) {
      console.error('Error finding or updating nearest hospital:', error);
      throw error;
    }

    timestamp = new Date().getTime();
    try {
      await updateDoc(userRef, {
        requests: { patientName: patientName, patientPain: patientPain, timestamp: timestamp }
      });
    }
    catch (error) {
      console.error('Error creating request: ', error);
      throw error;
    }
  }
}

export default UserManager;
