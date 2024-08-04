import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });
  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };
  useEffect(() => {}, [data]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Login to Checkout");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      toast.error("Login to Checkout");
      navigate("/cart");
    }
  }, [token]);

  return (
    <div>
      <form onSubmit={placeOrder} action="" className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              name="firstName"
              value={data.firstName}
              onChange={onchangeHandler}
              type="text"
              placeholder="First Name"
            />
            <input
              required
              name="lastName"
              value={data.lastName}
              onChange={onchangeHandler}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <input
            required
            name="email"
            value={data.email}
            onChange={onchangeHandler}
            type="email"
            placeholder="Email address"
          />
          <input
            required
            name="street"
            value={data.street}
            onChange={onchangeHandler}
            type="text"
            placeholder="Street"
          />

          <div className="multi-fields">
            <input
              required
              name="city"
              value={data.city}
              onChange={onchangeHandler}
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              value={data.state}
              onChange={onchangeHandler}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              required
              name="zipcode"
              value={data.zipcode}
              onChange={onchangeHandler}
              type="text"
              placeholder="Zip code"
            />
            <input
              required
              name="country"
              value={data.country}
              onChange={onchangeHandler}
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            name="phone"
            value={data.phone}
            onChange={onchangeHandler}
            type="text"
            placeholder="Phone"
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
