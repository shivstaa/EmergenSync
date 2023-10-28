
import { Link } from "react-router-dom";
import { AuthNav } from "./AuthNav.jsx";
import EmergencyShareRoundedIcon from '@mui/icons-material/EmergencyShareRounded';

function NavBar() {
    const { authUser, handleLogout } = AuthNav();

    return (
        <div className="flex justify-between items-center p-5 bg-gray-800 text-white shadow-lg">
            <Link to={'/'}>
                <h1 className="text-2xl hover:underline font-semibold flex items-center"><EmergencyShareRoundedIcon fontSize={"middle"}/>EmergenSync</h1>
            </Link>

            <div className="space-x-5">
                {authUser === null ? (
                    <Link to="/login">
                        <button className="text-xl hover:underline bg-gray-700 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-600">Login</button>
                    </Link>
                ) : (
                    <>
                        <Link to="/user">
                            <button className="text-xl hover:underline bg-gray-700 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-600">User</button>
                        </Link>

                        <Link to="/hospital">
                            <button className="text-xl hover:underline bg-gray-700 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-gray-600">Hospital</button>
                        </Link>

                        <Link to={"/"}>
                            <button onClick={handleLogout} className="text-xl bg-red-500 px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-red-400 text-white hover:underline">
                                Logout
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default NavBar;
