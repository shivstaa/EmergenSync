
import { Link } from "react-router-dom";
import { AuthNav } from "./AuthNav.jsx";
import { MdEmergencyShare, MdLocalHospital, MdHealthAndSafety, MdLogout } from "react-icons/md";

function NavBar() {
    const { authUser, handleLogout } = AuthNav();

    return (
        <div className="flex justify-between items-center p-5 bg-gray-800 text-white shadow-lg">
            <Link to="/">
                <h1 className="text-2xl hover:underline font-semibold flex items-center">
                    <MdEmergencyShare size={25} />
                    EmergenSync
                </h1>
            </Link>

            <div className="space-x-5">
                {authUser === null ? (
                    <Link to="/login">
                        <button className="text-xl hover:underline bg-gray-700 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-600">Login</button>
                    </Link>
                ) : (
                    <>
                        <div className="flex gap-4">

                            <Link to="/profile">
                                <button className="flex items-center gap-0.5 font-semibold text-xl hover:underline bg-gray-700 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-600"><MdHealthAndSafety />Profile</button>
                            </Link>

                            <Link to="/hospital">
                                <button className="flex items-center gap-0.5 font-semibold text-xl hover:underline bg-gray-700 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-600">
                                    <MdLocalHospital />Hospital
                                </button>
                            </Link>

                            <Link to={"/login"}>
                                <button onClick={handleLogout} className="flex items-center gap-0.5 font-semibold text-xl bg-red-500 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-red-400 text-white hover:underline">
                                    <MdLogout />Logout
                                </button>
                            </Link>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default NavBar;
