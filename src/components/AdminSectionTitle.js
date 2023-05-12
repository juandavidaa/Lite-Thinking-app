import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSectionTitle = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar bg-body-tertiary bg-dark">
      <div className="container-fluid justify-content-center text-light logo fs-3">
        {props.title}
      </div>
      <div className="logout">
        <button onClick={handleLogout}>logout</button>
      </div>
    </nav>
  );
};

export default AdminSectionTitle;
