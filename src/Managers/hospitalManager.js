import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../Components/FireBase/Config";

export default class HospitalManager {
    constructor(uid) {
        this.uid = uid;  // Store uid for later use
        this.hospitalRef = null;  // Initialize hospitalRef to null
        this.getHospitalFromUser(uid).then(hospitalRef => {
            this.hospitalRef = hospitalRef;
        });
        this.hospitalCollection = collection(db, 'Hospital');
    }

    async getHospitalFromUser(uid) {
        const userDoc = await getDoc(doc(db, 'User', uid));
        if (!userDoc.exists) {
            throw new Error(`User document with uid ${uid} does not exist`);
        }
        const userData = userDoc.data();
        console.log(userData);
        if (!userData || !userData.typeID) {
            throw new Error(`User data or typeID field is missing for uid ${uid}`);
        }
        // Since userData.typeID is already a DocumentReference, use it directly
        return userData.typeID;
    }
    
    
    async createHospital(uid, geolocation, name, capacity) {
        if (!this.hospitalRef) {
            // Creating a new hospital document
            const newHospitalRef = await this.hospitalCollection.add({
                userID: uid,
                geolocation: geolocation,
                hospitalName: name,
                availableRooms: 0,
                totalRooms: 0,
                rooms: []
            });
            this.hospitalRef = newHospitalRef;  // Update hospitalRef with the new reference

            // Update the user document with the new typeID
            await updateDoc(doc(db, 'User', uid), {
                typeID: newHospitalRef.id
            });

            // Add rooms to the new hospital
            for (var i = 0; i < capacity; i++) {
                await this.addHospitalRoom("");  // Assuming room name can be empty string
            }
        } else {
            throw new Error("Hospital already initiated");
        }
    }

    async addHospitalRoom(roomName) {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        const data = (await getDoc(this.hospitalRef)).data();

        let room = {
            roomName: roomName,
            isAvailable: true,
            lastUpdated: new Date()  // Set the lastUpdated field to the current date and time
        }

        await updateDoc(this.hospitalRef, {
            totalRooms: data.totalRooms + 1,
            availableRooms: data.availableRooms + 1,
            rooms: [...data.rooms, room]
        });
    }
    async updateRoomAvailability(roomName, isAvailable) {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        const data = (await getDoc(this.hospitalRef)).data();

        const updatedRooms = data.rooms.map(room => {
            if (room.roomName === roomName) {
                return { ...room, isAvailable, lastUpdated: new Date() };
            }
            return room;
        });

        await updateDoc(this.hospitalRef, {
            availableRooms: updatedRooms.filter(room => room.isAvailable).length,
            rooms: updatedRooms
        });
    }

    async getAvailableRooms() {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        const data = (await getDoc(this.hospitalRef)).data();
        return data.rooms.filter(room => room.isAvailable);
    }

    async getTotalRooms() {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        const data = (await getDoc(this.hospitalRef)).data();
        return data.rooms.length;
    }
}
