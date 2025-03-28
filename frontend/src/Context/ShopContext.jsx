import React, { useState, createContext, useEffect, useContext } from 'react'
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);
const ShopContextProvider = (props) => {

  const [allItems, setAllItems] = useState([]);
  const [images, setImages] = useState({});

  const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < allItems.length; index++) {
      cart[allItems[index].id] = 0
    }
    console.log(cart)
    return cart;
  }

  useEffect(() => {
    getDefaultCart()
  }, [allItems])

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])

  const getAllItem = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products/allproduct", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products data");
      }

      const items = await response.json();
      setAllItems(items);
      console.log(items)
      // Fetch images for all items
      items.forEach((item) => getImage(item.image));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch image by ID and update state
  const getImage = async (imageName) => {
    try {
      const response = await fetch(`http://localhost:4000/upload/images/${imageName}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      // Store image URL in state mapped by product ID
      setImages((prevImages) => ({
        ...prevImages,
        [imageName]: imageUrl,
      }));
    } catch (error) {
      console.error(`Error fetching image for ID ${imageName}:`, error);
    }
  };

  useEffect(() => {
    getAllItem();
  }, []);

  const addToCart = (itemId) => {
    if (itemId === 0) {
      setCartItems(getDefaultCart())
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1, // Ensure a default value of 0
      }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    Object.entries(cartItems).map(([key, value]) => {
      const itemInfo = allItems.find((item) => item.id === key);
      if (itemInfo) {
        totalAmount += itemInfo.new_price * value;
      }
    });
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];

      }

    }
    return totalItems;
  };

  const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, allItems, images, addToCart, removeFromCart, getDefaultCart };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}  { }
    </ShopContext.Provider>
  );
}
export default ShopContextProvider 