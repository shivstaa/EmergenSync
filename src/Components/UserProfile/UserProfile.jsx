
import { useState } from "react";
import ParamedicProfile from './ParamedicProfile';
import HospitalProfile from './HospitalProfile';

function UserProfile() {

    const [profileType, setProfileType] = useState("Hospital");
    const firstTime = false


    const renderProfile = () => {
        if (profileType === "Paramedic") {
            return <ParamedicProfile />;
        } else if (profileType === "Hospital") {
            return <HospitalProfile accountStateCheck={firstTime} />;
        }
    };

    return (
        <main>
            {renderProfile()}
        </main>
    );
}

export default UserProfile;
