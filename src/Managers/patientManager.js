import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../Components/FireBase/Config";


export default class PatientManager {

    async createPatient(firstname, lastname, dob, sex) {

        const patientRef = doc(collection(db, "Patient"));
        await setDoc(patientRef, {
            "First Name": firstname,
            "Last Name": lastname,
            date_of_birth: dob,
            sex: sex
        });
    }

    async getPatient(patientID) {
        const patientRef = doc(db, "Patient", patientID);
        const patientSnap = await getDoc(patientRef);
        if (patientSnap.exists()) {
            return patientSnap.data();
        } else {
            throw new Error("Patient does not exist");
        }
    }
}