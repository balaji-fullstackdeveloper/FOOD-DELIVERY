import React, { useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
function Verify() {
  const [nav, setNav] = useState(false);

  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const verifyPayment = async () => {
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });

    if (response.data.success) {
      toast.success("Your Order is Placed Successful");
      setNav(true);
      navigate("/myorders");
    }
    if (response.data.success == false) {
      toast.success("fail");
      setNav(false);
      navigate("/");
    }
  };
  verifyPayment();
  // useEffect(() => {
  //   verifyPayment();
  // }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
