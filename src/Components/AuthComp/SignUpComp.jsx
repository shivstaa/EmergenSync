
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth, provider} from "../FireBase/Config.jsx";
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import {SetToken} from "../FireBase/SaveToken.jsx";


function SignUpComp(){

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Type: ""
    })

    const [error, setError] = useState("")

    const handleAuthChange = (e) => {
        const {name, value} = e.target;

        setUserInfo({
            ...userInfo,
            [name]: value
        });
    }


    function passwordMatch(){
        if (userInfo.Password !== userInfo.ConfirmPassword){
            setError("Password not match!")
            return false
        }else {
            setError("Password match!")
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (passwordMatch()){

                const userCredential  = await createUserWithEmailAndPassword(auth, userInfo.Email, userInfo.Password)
                const user = userCredential.user;
                SetToken(user, user.accessToken)

                navigate('/user')
            }

        } catch (error){
            setError(error.message)
        }
    }

    const signUpWithGoogle = async () => {

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
        <div className={"flex justify-center items-center min-h-screen"}>
            <div className={"bg-white p-5 w-full max-w-md border rounded-md space-y-7"}>

                <div>
                    <h1 className={"font-bold text-3xl"}>Signup</h1>
                    <h2 className={"text-2xl"}>to get started</h2>
                </div>

                <button onClick={signUpWithGoogle} className="flex items-center justify-center w-full text-blue-500 border py-2 px-4 rounded">
                    <img src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                         alt="Google Icon" className="w-6 h-6 mr-2"/>
                    Sign up with Google
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

                    <input
                        className={"border rounded p-2"}
                        type={"password"}
                        name={"ConfirmPassword"}
                        placeholder={"Confirm Password"}
                        value={userInfo.ConfirmPassword}
                        onChange={handleAuthChange}
                        required
                    />

                    <div className="flex items-center justify-center">
                        <div className="flex-grow border-b border-gray-300 h-0"></div>
                        <h2 className="px-4 text-center">I am a</h2>
                        <div className="flex-grow border-b border-gray-300 h-0"></div>
                    </div>

                    <div className="flex items-center justify-evenly">
                        <div className="flex items-center">
                            <input type="radio" name="name1" value="value1" id="paramedic" required />
                            <label htmlFor="paramedic" className="ml-2">Paramedic</label>
                        </div>
                        <div className="flex items-center">
                            <input type="radio" name="name1" value="value2" id="hospital" />
                            <label htmlFor="hospital" className="ml-2">Hospital</label>
                        </div>
                    </div>


                    <div className={"space-y-0.5"}>

                        <button className={"w-full bg-blue-700 text-white py-2 px-4 rounded"}>
                            Continue
                        </button>

                        <h1 className={"text-red-700 text-center"}>{error}</h1>
                    </div>

                </form>


                <h1 className={"text-center"}>Already registered? <Link to={"/login"} className={"font-bold hover:text-blue-700 hover:cursor-pointer hover:underline"}>Login</Link></h1>
            </div>
        </div>
    )






}

export default SignUpComp;