
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const SlidingAlert = ({ message, visible, onClose }) => {
    const [showAlert, setShowAlert] = useState(visible);

    useEffect(() => {
        let timeout;
        if (visible) {
            setShowAlert(true);
            timeout = setTimeout(() => {
                setShowAlert(false);
                onClose();
            }, 1500); // Adjust the duration as needed
        }

        return () => clearTimeout(timeout);
    }, [visible, onClose]);

    return (
        <div
            className={`fixed top-24 right-0 transform ${showAlert ? "-translate-x-3" : "translate-x-full"} transition-transform duration-300 ease-in-out w-52 sm:w-72 rounded-lg z-10 shadow-lg`}
        >
            <div className="bg-green-500 text-green-800 rounded-lg py-2 px-2 flex justify-between items-center">
                <div className="px-1 flex items-center gap-2 font-semibold">
                    <FaCheck className="text-2xl" />
                    {message}
                </div>
                <button
                    className="text-white cursor-pointer"
                    onClick={() => {
                        setShowAlert(false);
                        onClose();
                    }}
                >
                    <span className={"text-3xl text-green-900 hover:text-green-950"}>&times;</span>
                </button>
            </div>
        </div>
    );
};

export default SlidingAlert;
