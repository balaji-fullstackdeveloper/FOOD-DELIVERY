import React from "react";
import "./Navbar.css";
import { assets } from "../../../admin_assets/assets";
import { useNavigate } from "react-router-dom";

function Navbar({ setToken }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="navbar">
      <img src={assets.logo} className="logo" alt="" />
      <div className="rightside">
        {" "}
        <button className="logoutbutton" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
