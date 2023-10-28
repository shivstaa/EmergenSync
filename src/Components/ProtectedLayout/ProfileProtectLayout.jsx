
import {Navigate, Outlet} from "react-router-dom";
import HospitalProfile from "../UserProfile/HospitalProfile";


function ProtectLayout(){

    const firstTime = true

    return (
        <HospitalProfile accountStateCheck={firstTime} />
    )

}

export default ProtectLayout;