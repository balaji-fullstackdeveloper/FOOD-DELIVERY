import "./index.css";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import { useState, useEffect } from "react";
import { url } from "./assests/assets";

function App() {
  const [token, setToken] = useState("");
  const setLocalStorageWithExpiry = (key, value, ttl) => {
    const now = new Date();

    // Create an object with the value and expiry time
    const item = {
      value: value,
      expiry: now.getTime() + ttl, // ttl in milliseconds
    };

    // Store the item in localStorage
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getLocalStorageWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Check if the item has expired
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key); // Remove expired item
      return null;
    }

    return item.value;
  };
  const ProtectedRoute = ({ children }) => {
    if (token == "") {
      return;
    } else {
      return children;
    }
  };
  useEffect(() => {
    function loadData() {
      if (getLocalStorageWithExpiry("token")) {
        setToken(getLocalStorageWithExpiry("token"));
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <ToastContainer />

      <hr />
      <div className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                url={url}
                setLocalStorageWithExpiry={setLocalStorageWithExpiry}
                setToken={setToken}
              />
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <Add url={url} setToken={setToken} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                {" "}
                <List url={url} setToken={setToken} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders url={url} setToken={setToken} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
