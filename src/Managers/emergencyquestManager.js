
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../Components/FireBase/Config";


export default class EmergencyRequestManager {

    async createEmergencyRequest(patientInfo, paramedicDriver) {
        //Get the time the request was created
        const time = new Date().getTime();
        await db.collection("EmergencyRequests").add({
            patientInfo: patientInfo,
            paramedicDriver: paramedicDriver,
            createdAt: time
        });

    }

    async confirmEmergencyRequest(patientID, assignedHospital, roomName) {
        const time = new Date().getTime();
        await db.collection("EmergencyRequests").doc(patientID).update({
            assignedHospital: assignedHospital,
            roomName: roomName,
            confirmedAt: time
        });
    }

    async updateArrival(patientID) {
        const time = new Date().getTime();
        await db.collection("EmergencyRequests").doc(patientID).update({
            patientArrival: time
        });
    }



}

