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
    const response = await fetch(url + "/api/order/verify", {
      method: "POST",
      headers: {
       
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success,
        orderId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
    // .then((res) => console.log(res.json()));

    // const response = await axios.post(url + "/api/order/verify", {
    //   success,
    //   orderId,
    // });
    // console.log(response);
    if (response.success) {
      toast.success("Your Order is Placed Successful");
      setNav(true);
      navigate("/myorders");
    }
    if (response.success == false) {
      toast.success("fail");
      setNav(false);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
