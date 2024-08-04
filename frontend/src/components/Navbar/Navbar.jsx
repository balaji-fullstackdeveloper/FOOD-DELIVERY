import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const [menu, setMenu] = useState("menu");
  const navigate = useNavigate();
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  const [display, setDisplay] = useState(false);
  const displayHandler = () => {
    if (display) {
      setDisplay(false);
    }
    if (!display) {
      setDisplay(true);
    }
  };
  return (
    <div>
      <div className="navbar">
        <i onClick={() => displayHandler()} className="gg-menu-round"></i>
        <Link to="/">
          <img src={assets.logo} alt="" className="logo" />
        </Link>

        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="/#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="/#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile-app
          </a>
          <a
            href="/#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact us
          </a>
        </ul>
        <div className="navbar-right">
          <FontAwesomeIcon icon="fa-brands fa-facebook" />
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
              <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </Link>
          </div>
          {!token ? (
            <button onClick={() => navigate("/login")}>Sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  Orders
                </li>
                <hr />
                <li onClick={() => logout()}>
                  <img src={assets.logout_icon} alt="" />
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="sidebar">
        <ul
          className={`sidebar-menu ${display ? "isVisible" : "none"}`}
          id="side-menu"
        >
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active border" : "border"}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active border" : "border"}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app border" ? "active" : "border"}
          >
            Mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us border" ? "active" : "border"}
          >
            Contact us
          </a>
          <a className="empty"></a>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
