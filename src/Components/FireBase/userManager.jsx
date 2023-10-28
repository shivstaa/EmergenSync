// UserManager.js
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./Config";

export class UserManager {
  constructor() {
    this.db = getFirestore();
  }

  // Create or Update User Details
  async saveUserDetails(uid, userDetails) {
    const userRef = doc(this.db, "Users", uid);
    try {
      await setDoc(userRef, userDetails, { merge: true }); // Merge true to update existing fields without overwriting
    } catch (error) {
      console.error("Error saving user details: ", error);
      throw error;
    }
  }

  // Read User Details
  async getUserDetails(uid) {
    const userRef = doc(this.db, "Users", uid);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        throw new Error("User does not exist");
      }
    } catch (error) {
      console.error("Error getting user details: ", error);
      throw error;
    }
  }

  // Create or Update Emergency Request
  async saveEmergencyRequest(requestId, emergencyRequest) {
    const requestRef = doc(this.db, "EmergencyRequests", requestId);
    try {
      await setDoc(requestRef, emergencyRequest, { merge: true });
    } catch (error) {
      console.error("Error saving emergency request: ", error);
      throw error;
    }
  }

  // Read Emergency Request
  async getEmergencyRequest(requestId) {
    const requestRef = doc(this.db, "EmergencyRequests", requestId);
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

  // Additional methods for deleting users or emergency requests can be added here...

  async addHospitalRoom(uid, roomId, roomName) {
    const userRef = doc(this.db, "Users", uid);
    const userDoc = await getDoc(userRef);
    const data = userDoc.data();
    await updateDoc(userRef, {
      totalRooms: data.totalRooms + 1,
      availableRooms: data.availableRooms + 1,
    });
  }

  async changeRoomAvailability(uid, roomId) {
    const userRef = doc(this.db, "Users", uid);
    const userDoc = await getDoc(userRef);
    const data = userDoc.data();
    const rooms = data.rooms;
    const availableRooms = data.availableRooms;
    const roomsRef = collection(this.db, "Users", uid, "rooms");
    const roomDoc = doc(roomsRef, roomId);
    const roomRef = await getDoc(roomDoc);
    await updateDoc(roomDoc, { availability: !roomRef.availability });
    await updateDoc(userRef, {
      rooms: [...rooms, roomDoc],
      availableRooms: roomRef.availability
        ? availableRooms + 1
        : availableRooms - 1,
    });
  }

  async deleteHospitalRoom(uid, roomId) {
    const userRef = doc(this.db, "Users", uid);
    const userDoc = await getDoc(userRef);
    const data = userDoc.data();
    await updateDoc(userRef, {
      rooms: data.rooms.filter((room) => room.roomId !== roomId),
      totalRooms: data.totalRooms - 1,
    });
  }

  async findNearestHospital(uid) {
    const userRef = doc(this.db, "Users", uid);
    const geolocation = userRef.geolocation;

    const querySnapshot = await this.db
      .collection("Users")
      .where("type", "==", "Hospital")
      .where("availability", "==", true)
      .get();

    let nearestHospital = null;
    let distance = Infinity;

    querySnapshot.forEach((doc) => {
      const dist_to_hospital = Math.sqrt(
        (geolocation.latitude - doc.data().geolocation.latitude) ** 2 +
          (geolocation.longitude - doc.data().geolocation.longitude) ** 2,
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
      const userRef = doc(this.db, "Users", uid);
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

  async createUserDocument(uid, userType) {
    const userRef = doc(db, "User", uid); // Use doc to reference a specific document
    try {
      await setDoc(userRef, { userType }); // Use setDoc to set the document data
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }
}
