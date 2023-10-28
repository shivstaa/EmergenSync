import React from "react";
import { useNavigate } from "react-router-dom";

function ParamedicProfile() {
  const navigate = useNavigate();

  const handleRequestCreation = () => {
    navigate("/request");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // first name, last name
    
  };
  
  return (
    <div className="paramedic-profile">
        <form onSubmit={handleSubmit}  className="bg-night p-6 rounded shadow-lg w-[33vw] h-[65vh]"
></form>
      {/* <button onClick={handleRequestCreation} className="btn btn-primary">
        Create Request
      </button> */}
    </div>
  );
}

export default ParamedicProfile;
