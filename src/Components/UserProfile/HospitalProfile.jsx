import React, { useState } from 'react';

function HospitalProfile() {
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalAddress, setHospitalAddress] = useState('');
    const [totalCapacity, setTotalCapacity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="hospital-profile bg-gray-900 min-h-screen flex items-center justify-center p-8">
            <form onSubmit={handleSubmit} className="bg-night p-6 rounded shadow-lg w-[50vw] h-[75vh]">
                <div className="mb-4">
                    <label htmlFor="hospitalName" className="block text-white mb-2">
                        Hospital Name:
                    </label>
                    <input type="text" id="hospitalName" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} className="w-full p-2 border border-gray-700 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="hospitalAddress" className="block text-white mb-2">
                        Hospital Address:
                    </label>
                    <input type="text" id="hospitalAddress" value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)} className="w-full p-2 border border-gray-700 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="totalCapacity" className="block text-white mb-2">
                        Total Capacity:
                    </label>
                    <input type="number" id="totalCapacity" value={totalCapacity} onChange={(e) => setTotalCapacity(e.target.value)} className="w-full p-2 border border-gray-700 rounded" />
                </div>
                <button type="submit" className="bg-gray-800 text-white w-full px-4 py-2 rounded hover:bg-gray-700">Submit</button>
            </form>
        </div>
    );
}

export default HospitalProfile;
