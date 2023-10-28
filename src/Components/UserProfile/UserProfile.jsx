
import { useState, useEffect } from "react";
import ParamedicProfile from "./ParamedicProfile";
import HospitalProfile from "./HospitalProfile";
import UserManager from "../../Managers/userManager";
import { getUserAuth } from "../FireBase/SaveToken";
import CircularProgress from '@mui/joy/CircularProgress';
import HospitalManager from "../../Managers/hospitalManager";

function UserProfile() {
    const getUID = getUserAuth();
    const userManager = new UserManager();
    const [userType, setUserType] = useState(null);


    useEffect(() => {
        async function fetchUserData() {
            try {
                const type = await userManager.getUserType(getUID.uid);
                setUserType(type);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        }

        fetchUserData();
    }, [getUID.uid]);

    return (
        <main>
            {userType === "Paramedic" ? (
                <ParamedicProfile />
            ) : userType === "Hospital" ? (
                <HospitalProfile userUID={getUID.uid}/>
            ) : (
                <div className={"bg-night flex justify-center items-center h-[calc(100vh-84px)]"}>
                    <CircularProgress color="secondary" />
                </div>
            )}
        </main>
    );
}

export default UserProfile;
