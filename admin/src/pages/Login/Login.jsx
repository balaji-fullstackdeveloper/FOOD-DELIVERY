import React from "react";
import "./Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ url, setLocalStorageWithExpiry, setToken }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = `${url}/api/user/loginadmin`;

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      setLocalStorageWithExpiry("token", response.data.token, 1000 * 60 * 60);
      navigate("/orders");
    } else {
      alert(response.data.message);
    }
  };
  useEffect(() => {}, [data]);
  return (
    <div className="login">
      <div className="loginbackground">
        <div className="shape1"></div>
        <div className="shape2"></div>
      </div>
      <form onSubmit={onLogin} className="formtag">
        <h3>Login Here</h3>

        <label className="labeltag" htmlFor="username">
          Username
        </label>
        <input
          onChange={(e) => onChangeHandler(e)}
          className="inputtag"
          value={data.email}
          name="email"
          type="text"
          placeholder="Email or Phone"
          id="username"
        />

        <label className="labeltag" htmlFor="password">
          Password
        </label>
        <input
          onChange={(e) => onChangeHandler(e)}
          value={data.password}
          name="password"
          className="inputtag"
          type="password"
          placeholder="Password"
          id="password"
        />

        <button type="submit" className="buttontag">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
