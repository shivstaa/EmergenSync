import { Link } from "react-router-dom";
import { AuthNav } from "./AuthNav.jsx";
import { FaHeadSideMask, FaHeartPulse, FaHospitalUser } from "react-icons/fa6";
import { FaHospital, FaSignOutAlt } from "react-icons/fa";

function NavBar() {
  const { authUser, handleLogout } = AuthNav();

  return (
    <div className="flex justify-between items-center p-5 bg-gray-800 text-white shadow-lg">
      <Link to={"/"}>
        <h1 className="flex gap-2 text-2xl font-semibold items-center">
          <FaHeartPulse />
          EmergenSync
        </h1>
      </Link>

      <div className="space-x-5">
        {authUser === null ? (
          <Link to="/login">
            <button className="text-xl hover:underline bg-gray-700 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-600">
              Login
            </button>
          </Link>
        ) : (
          <div className={"flex gap-2"}>
            <Link to="/profile">
              <button className="flex items-center gap-2 text-xl hover:underline bg-gray-700 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-600">
                <FaHospitalUser />
                Profile
              </button>
            </Link>

            <Link to="/hospital">
              <button className="flex items-center gap-2 text-xl hover:underline bg-gray-700 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-600">
                <FaHospital />
                Hospital
              </button>
            </Link>

            <Link to={"/"}>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xl bg-red-500 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-red-400 text-white hover:underline"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
