
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, provider} from "../FireBase/Config.jsx";
import { signInWithPopup } from "firebase/auth"
import {getToken, SetToken} from "../FireBase/SaveToken.jsx";

function LoginComp(){

    const navigate = useNavigate();

    useEffect(() => {
        if (getToken()){
            navigate("/user")
        }
    }, [])

    const [userInfo, setUserInfo] = useState({
        Email: "",
        Password: ""
    })
    const [error, setError] = useState("")


    const handleAuthChange = (e) => {
        const {name, value} = e.target;

        setUserInfo({
            ...userInfo,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const userCredential  = await signInWithEmailAndPassword(auth, userInfo.Email, userInfo.Password)
            const user = userCredential.user;

            SetToken(user, user.accessToken)

            navigate('/user')

        } catch (error){
            setError(error.message)
        }
    }

    const signInWithGoogle = async () => {

        try {

            const userCredential = await signInWithPopup(auth, provider)
            const user = userCredential.user

            SetToken(user, user.accessToken)

            navigate('/user')

        } catch (error) {
            setError(error.message)
        }


    }

    return (
        <div className={"flex justify-center items-center h-[calc(100vh-84px)]"}>
            <div className={"bg-white p-5 w-full max-w-md border rounded-md space-y-7"}>

                <div>
                    <h1 className={"font-bold text-3xl"}>Login</h1>
                    <h2 className={"text-2xl"}>to get started</h2>
                </div>

                <button onClick={signInWithGoogle} className="flex items-center justify-center w-full text-blue-500 border py-2 px-4 rounded">
                    <img src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                         alt="Google Icon" className="w-6 h-6 mr-2"/>
                    Sign in with Google
                </button>

                <form onSubmit={handleSubmit} className={"flex flex-col space-y-5"}>
                    <input
                        className={"border rounded p-2"}
                        type={"email"}
                        name={"Email"}
                        placeholder={"Email"}
                        value={userInfo.Email}
                        onChange={handleAuthChange}
                        required
                    />

                    <input
                        className={"border rounded p-2"}
                        type={"password"}
                        name={"Password"}
                        placeholder={"Password"}
                        value={userInfo.Password}
                        onChange={handleAuthChange}
                        required
                    />

                    <div className={"space-y-0.5"}>

                        <button className={"w-full bg-blue-700 text-white py-2 px-4 rounded"}>
                            Continue
                        </button>

                        <h1 className={"text-red-700 text-center"}>{error}</h1>
                    </div>

                </form>


                <h1 className={"text-center"}>New User? <Link to={"/signup"} className={"font-bold hover:text-blue-700 hover:cursor-pointer hover:underline"}>Register</Link></h1>
            </div>
        </div>
    )






}

export default LoginComp;