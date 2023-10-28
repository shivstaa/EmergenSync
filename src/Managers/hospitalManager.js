import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../Components/FireBase/Config";

export default class HospitalManager {
    constructor(uid) {
        this.uid = uid;  // Store uid for later use
        this.getHospitalFromUser(uid).then(hospitalRef => {
            this.hospitalRef = hospitalRef;
        });
        this.hospitalCollection = collection(db, 'Hospitals');
    }

    async getHospitalFromUser(uid) {
        const userDoc = await getDoc(doc(db, 'Users', uid));
        return doc(db, 'Hospitals', userDoc.data().hospitalID);
    }

    async createHospital(uid, geolocation, name, capacity) {
        // if (!this.hospitalRef) {
        //     throw new Error("Hospital not initiated");
        // }

        const data = (await getDoc(this.hospitalRef)).data();
        await this.hospitalCollection.add({
            userID: uid,
            geolocation: geolocation,
            hospitalName: name,  // Fixed typo: hostpitalName -> hospitalName
            availableRooms: 0,
            totalRooms: 0,
            rooms: []
        });

        for (var i = 0; i < capacity; i++) {
            await this.addHospitalRoom("");  // Assuming room name can be empty string
        }
    }

    async addHospitalRoom(roomName) {
        if (!this.hospitalRef) {
            throw new Error("Hospital not initiated");
        }

        const data = (await getDoc(this.hospitalRef)).data();

        let room = {
            roomName: roomName,
            availability: true
        }

        await updateDoc(this.hospitalRef, {
            totalRooms: data.totalRooms + 1,
            availableRooms: data.availableRooms + 1,
            rooms: [...data.rooms, room]
        });
    }
}