
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ParamedicProfile() {
    const navigate = useNavigate();

    const handleRequestCreation = () => {
        navigate('/request');
    };

    return (
        <div className="paramedic-profile">
            <button onClick={handleRequestCreation} className="btn btn-primary">
                Create Request
            </button>
        </div>
    );
}

export default ParamedicProfile;
