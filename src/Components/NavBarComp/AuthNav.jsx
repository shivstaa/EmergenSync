
import { useState, useEffect } from "react";
import { auth } from "../FireBase/Config.jsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {DeleteToken, getToken} from "../FireBase/SaveToken.jsx";

export function AuthNav() {

    const [authUser, setAuthUser] = useState(getToken());

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        console.log('Logged out');
        DeleteToken();
        await signOut(auth)
    };

    return { authUser, handleLogout };
}
