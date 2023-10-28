// UserManager.js
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Components/FireBase/Config";

export default class UserManager {
  constructor() {
    this.db = db;
  }

  // // Create or Update User Details
  // async saveUserDetails(uid, userDetails) {
  //   const userRef = doc(this.db, 'Users', uid);
  //   try {
  //     await setDoc(userRef, userDetails, { merge: true });  // Merge true to update existing fields without overwriting
  //   } catch (error) {
  //     console.error('Error saving user details: ', error);
  //     throw error;
  //   }
  // }

  // // Read User Details
  // async getUserDetails(uid) {
  //   const userRef = doc(this.db, 'Users', uid);
  //   try {
  //     const userSnap = await getDoc(userRef);
  //     if (userSnap.exists()) {
  //       return userSnap.data();
  //     } else {
  //       throw new Error('User does not exist');
  //     }
  //   } catch (error) {
  //     console.error('Error getting user details: ', error);
  //     throw error;
  //   }
  // }

  async createUser(uid, userType, emailAddress) {
    const userRef = doc(db, "User", uid);
    try {
      await setDoc(userRef, { userType, emailAddress, typeID: null }); // typeID is set to null initially
      console.log("User document successfully written!");
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }
  
  async getUserType(uuid) {
    const userRef = doc(db, "User", uuid);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data().userType;
      } else {
        throw new Error("User does not exist");
      }
    } catch (error) {
      console.error("Error getting user details: ", error);
      throw error;
    }
  }

  async hasOnboarded(uuid) {
    //If the user has a typeID then they have onboarded else they have not
    const userRef = doc(db, "User", uuid);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().typeID != null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error getting user details: ", error);
      throw error;
    }
  }

  // Create or Update Emergency Request
  async saveEmergencyRequest(requestId, emergencyRequest) {
    const requestRef = doc(this.db, "EmergencyReq", requestId);
    try {
      await setDoc(requestRef, emergencyRequest, { merge: true });
    } catch (error) {
      console.error("Error saving emergency request: ", error);
      throw error;
    }
  }

  // Read Emergency Request
  async getEmergencyRequest(requestId) {
    const requestRef = doc(this.db, "EmergencyReq", requestId);
    try {
      const requestSnap = await getDoc(requestRef);
      if (requestSnap.exists()) {
        return requestSnap.data();
      } else {
        throw new Error("Emergency request does not exist");
      }
    } catch (error) {
      console.error("Error getting emergency request: ", error);
      throw error;
    }
  }

  async findNearestHospital(uid) {
    const userRef = doc(this.db, "User", uid);
    const geolocation = userRef.geolocation;

    const querySnapshot = await this.db
      .collection("User")
      .where("type", "==", "Hospital")
      .where("availability", "==", true)
      .get();

    let nearestHospital = null;
    let distance = Infinity;

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
      throw new Error("No available hospitals found.");
    }

    return nearestHospital;
  }

  async findAvailableRoom(hospitalRef) {
    let room = null;

    for (let i = 0; i < hospitalRef.rooms.length; i++) {
      if (hospitalRef.rooms[i].availability) {
        room = hospitalRef.rooms[i];
        break;
      }
    }

    if (!room) {
      throw new Error("No available rooms found.");
    }

    return room;
  }

  async createRequest(uid, patientName, patientPain) {
    try {
      const nearestHospital = await this.findNearestHospital(uid);
      const hospitalRef = doc(this.db, "Users", nearestHospital.id);

      if (!hospitalRef.availability) {
        throw new Error("Hospital is not available");
      }

      const room = await this.findAvailableRoom(hospitalRef);

      //Update room availability
      await updateDoc(hospitalRef, {
        rooms: [...hospitalRef.rooms, { ...room, availability: false }],
        availableRooms: hospitalRef.availableRooms - 1,
      });
    } catch (error) {
      console.error("Error finding or updating nearest hospital:", error);
      throw error;
    }

    let timestamp = new Date().getTime();
    try {
      const userRef = doc(this.db, "User", uid);
      await updateDoc(userRef, {
        requests: {
          patientName: patientName,
          patientPain: patientPain,
          timestamp: timestamp,
        },
      });
    } catch (error) {
      console.error("Error updating user requests:", error);
      throw error;
    }
  }
}
