import { getToken } from "../FireBase/SaveToken.jsx";
import { Navigate, Outlet } from "react-router-dom";

function ProtectLayout() {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectLayout;
