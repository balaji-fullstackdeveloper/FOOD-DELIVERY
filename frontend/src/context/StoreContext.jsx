import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});
  const url = "http://localhost:8000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addCartItem = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        {
          headers: {
            token,
          },
        }
      );
    }
  };
  const removeCartItem = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        {
          headers: {
            token,
          },
        }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
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
    if (now.getTime() < item.expiry) {
      return item.value;
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (getLocalStorageWithExpiry("token")) {
        setToken(getLocalStorageWithExpiry("token"));
        await loadCartData(getLocalStorageWithExpiry("token"));
      }
    }
    loadData();
  }, []);
  useEffect(() => {}, [token]);

  const contextValue = {
    food_list,
    addCartItem,
    setCartItem,
    removeCartItem,
    cartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
    setLocalStorageWithExpiry,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
