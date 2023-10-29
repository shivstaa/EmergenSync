import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Components/FireBase/Config";
import geohash from 'ngeohash';

export default class HospitalManager {
    constructor(uid) {
        this.uid = uid;  // Store uid for later use
        this.hospitalRef = null;  // Initialize hospitalRef to null
        this.hospitalCollection = collection(db, 'Hospital');  // Reference to the Hospital collection
    }

    static async create(uid) {
        const manager = new HospitalManager(uid);
        await manager.initializeHospitalRef(uid);
        return manager;
    }

    async initializeHospitalRef(uid) {
        const userDoc = await getDoc(doc(db, 'User', uid));
        if (!userDoc.exists) {
            throw new Error(`User document with uid ${uid} does not exist`);
        }

        const userData = userDoc.data();
        if (userData && userData.typeID) {
            this.hospitalRef = doc(db, 'Hospital', userData.typeID);  // Update hospitalRef with existing reference
        } else {
            await this.updateHospital(uid);  // Create a new hospital instance if none exists
        }
    }

    async updateHospital(uid, name = '', address = "", capacity = 0, geoLocation = { lat: 0, lng: 0 }) {
        const geoHash = geohash.encode(geoLocation.lat, geoLocation.lng);

        try {

            // Creating a new hospital document
            const newHospitalRef = doc(collection(db, 'Hospital'));
            const geoHash = geohash.encode(geoLocation.lat, geoLocation.lng);

            await setDoc(newHospitalRef, {
                userID: uid,
                hospitalName: name,
                hospitalAddress: address,
                availableRooms: capacity,
                totalRooms: capacity,
                geoLocation: geoLocation,
                geoHash: geoHash,
            });
            this.hospitalRef = newHospitalRef;  // Update hospitalRef with the new reference

            // Update the user document with the new typeID
            await updateDoc(doc(db, 'User', uid), {
                typeID: newHospitalRef.id
            });

            // Add rooms to the new hospital
            if (capacity > 0) {
                const roomCollectionRef = collection(this.hospitalRef, 'Rooms'); // Reference to the subcollection

                for (let i = 0; i < capacity; i++) {
                    const roomDocRef = doc(roomCollectionRef); // Create a new room document
                    await setDoc(roomDocRef, {
                        roomName: "", // You can add room-specific data here
                        isAvailable: true,
                        isHold: false,
                        patientinRoom: "",
                        lastUpdated: new Date().getTime(),
                    });
                }
            } else {
                const geoHash = geohash.encode(geoLocation.lat, geoLocation.lng);
                // Handle the case where the hospital is already initiated
                // You can choose to update the hospital name and address here.
                await updateDoc(this.hospitalRef, {
                    hospitalName: name,
                    hospitalAddress: address,
                    totalRooms: capacity,
                    geoHash: geoHash
                });
            }
            console.log("Hospital updated successfully!");
        } catch (error) {
            console.error("Error updating hospital:", error);
        }
    }


    async addHospitalRoom(roomName = "") {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        try {
            // Reference the "Rooms" subcollection within the hospital document
            const roomCollectionRef = collection(this.hospitalRef, 'Rooms');

            // Create a new document in the "Rooms" subcollection for the room
            const roomDocRef = doc(roomCollectionRef);

            const room = {
                roomName: roomName,
                isAvailable: true,
                isHold: false,
                patientinRoom: "",
                lastUpdated: new Date().getTime(),
            };

            // Set the room document data
            await setDoc(roomDocRef, room);

            // Update the counts in the main hospital document
            const data = (await getDoc(this.hospitalRef)).data();
            const updatedData = {
                totalRooms: (data.totalRooms || 0) + 1,
                availableRooms: (data.availableRooms || 0) + 1,
            };

            await updateDoc(this.hospitalRef, updatedData);
            console.log("Room added successfully!");
        } catch (error) {
            console.error("Error adding hospital room:", error);
        }
    }

    async updateRoomAvailability(roomID, isAvailable, isHold, patientinRoom) {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        try {
            // Reference the "Rooms" subcollection within the hospital document
            const roomCollectionRef = collection(this.hospitalRef, 'Rooms');

            // Reference the room document
            const roomDocRef = doc(roomCollectionRef, roomID);

            // Update the room document data
            await updateDoc(roomDocRef, {
                isAvailable: isAvailable,
                isHold: isHold,
                patientinRoom: patientinRoom,
                lastUpdated: new Date().getTime(),
            });

            // Update the counts in the main hospital document
            const data = (await getDoc(this.hospitalRef)).data();
            const updatedData = {
                availableRooms: (data.availableRooms || 0) + (isAvailable ? 1 : -1),
            };

            await updateDoc(this.hospitalRef, updatedData);
            console.log("Room updated successfully!");
        } catch (error) {
            console.error("Error updating hospital room:", error);
        }
    }

    async getAvailableRooms() {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        const data = (await getDoc(this.hospitalRef)).data();

        return data.rooms.filter(room => room.isAvailable).length;
    }

    async getTotalRooms() {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        const data = (await getDoc(this.hospitalRef)).data();
        return data.rooms.length;
    }


    async getHospitalName() {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        const data = (await getDoc(this.hospitalRef)).data();
        return data.hospitalName;
    }

    async setHospitalName(name) {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        await updateDoc(this.hospitalRef, {
            hospitalName: name
        });
    }

    async getHospitalData() {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");

        }
        const data = (await getDoc(this.hospitalRef)).data();
        return data;
    }

    async getRooms() {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }
    
        const roomsCollectionRef = collection(this.hospitalRef, 'Rooms');
        const roomsQuerySnapshot = await getDocs(roomsCollectionRef);
    
        // Initialize an object to store the rooms data
        const roomsData = {};
    
        roomsQuerySnapshot.forEach((roomDoc) => {
            roomsData[roomDoc.id] = roomDoc.data();
        });
    
        return roomsData;
    }
        

    async updateGeoLocation(geoLocation) {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        const geoHash = geohash.encode(geoLocation.lat, geoLocation.lng);

        await updateDoc(this.hospitalRef, {
            geoLocation: geoLocation,
            geoHash: geoHash
        });
    }

}