
import {Link} from "react-router-dom";
import {AuthNav} from "./AuthNav.jsx";
function NavBar(){

    const { authUser, handleLogout } = AuthNav();


    return (
        <div className={"flex justify-between p-5"}>

            <Link to={'/'}>
                <h1 className={"text-2xl hover:underline"}>Example</h1>
            </Link>


            <div className={"space-x-5"}>

                {authUser === null ? (
                    <Link to="/login">
                        <button className="text-xl hover:underline">Login</button>
                    </Link>
                ) : (
                    <>
                        <Link to="/user">
                            <button className="text-xl hover:underline">User</button>
                        </Link>

                        <Link to={"/"}>
                            <button onClick={handleLogout} className="text-red-500 text-xl hover:underline">
                                Logout
                            </button>
                        </Link>
                    </>
                )}

            </div>

        </div>
    )


}

export default NavBar;
