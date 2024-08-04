import "./Login.css";
import SignInForm from "./SingIn";
import SignUpForm from "./Singup";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
export default function App() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { url, setToken, setLocalStorageWithExpiry } = useContext(StoreContext);
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = `${url}/api/user/login`;

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      setLocalStorageWithExpiry("token", response.data.token, 1000 * 60 * 60);
      navigate("/");
    } else {
      alert(response.data.message);
    }
  };
  const onSignUp = async (event) => {
    event.preventDefault();
    let newUrl = `${url}/api/user/register`;

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      setLocalStorageWithExpiry("token", response.data.token, 1000 * 60 * 60);
      navigate("/");
    } else {
      alert(response.data.message);
    }
  };
  useEffect(() => {}, [data]);
  return (
    <div className="App body">
      <div className={containerClass} id="container">
        <SignUpForm
          data={data}
          onSignUp={onSignUp}
          onChangeHandler={onChangeHandler}
        />
        <SignInForm
          data={data}
          onLogin={onLogin}
          onChangeHandler={onChangeHandler}
        />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost button"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="button"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
