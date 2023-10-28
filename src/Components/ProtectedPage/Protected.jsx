import { DeleteToken, getUserAuth } from "../FireBase/SaveToken.jsx";
import { Link, useNavigate } from "react-router-dom";

function Protected() {
  const userInfo = getUserAuth();

  return (
    <div className={"flex flex-col gap-4 justify-center items-center"}>
      <h1 className={"text-2xl"}>Welcome {userInfo && userInfo.email}!</h1>
    </div>
  );
}

export default Protected;
