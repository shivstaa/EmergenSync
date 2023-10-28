import { useState } from "react";
import ParamedicProfile from "./ParamedicProfile";
import HospitalProfile from "./HospitalProfile";

function UserProfile() {
  // set state to be the database's user attribute userType
  const [profileType, setProfileType] = useState("Hospital");

  const renderProfile = () => {
    if (profileType === "Paramedic") {
      return <ParamedicProfile />;
    } else if (profileType === "Hospital") {
      return <HospitalProfile />;
    }
  };

  return <main>{renderProfile()}</main>;
}

export default UserProfile;
