import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../Components/FireBase/Config";


export default class paraMedicManager {

    async createParamedic(uuid, first_name, last_name, phone_number){
        const userRef = collection(db, "Paramedic");
        const querySnapshot = await getDoc(userRef);
        querySnapshot.forEach((doc) => {
            if (doc.data().userID === uuid) {
                throw new Error("User already exists");
            }
        });
        const paramedicRef = doc(collection(db, "Paramedic"));
        await setDoc(paramedicRef, {
            userId: uuid,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number
        });
    }

    async updateParamedic(uuid, first_name, last_name, phone_number){
        const paramedicRef = doc(db, "Paramedic", uuid);
        await updateDoc(paramedicRef, {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number
        });
    }

    async getParamedic(uuid){
        const paramedicRef = doc(db, "Paramedic", uuid);
        const paramedicSnap = await getDoc(paramedicRef);
        if (paramedicSnap.exists()) {
            return paramedicSnap.data();
        } else {
            throw new Error("Paramedic does not exist");
        }
    }

    async updateLocation(uuid, geoLocation){
        const paramedicRef = doc(db, "Paramedic", uuid);
        await updateDoc(paramedicRef, {
            geoLocation: geoLocation
        });
    }



}