import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { toast, ToastContainer } from "react-toastify"
import { v4 as uuidv4 } from 'uuid';

export const CartItems = () => {
  const { getTotalCartAmount, allItems, images, cartItems, removeFromCart, addToCart } = useContext(ShopContext);
  const [items, setItem] = useState([])
  const [loading, setLoading] = useState(false)

  const saveOrder = async () => {
    setLoading(true)
    // Extract items from cartItems and find them in allItems
    const orderItems = Object.entries(cartItems)
      .map(([key, value]) => {
        return allItems.find(item => item.id === key);
      })
      .filter(item => item !== undefined); // Remove undefined values

    // Construct the order data
    const orderData = {
      id: uuidv4(), // Example order ID
      items: orderItems.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        category: item.category,
        new_price: item.new_price,
        old_price: item.old_price
      }))
    };

    try {
      const response = await fetch("http://localhost:4000/order/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      toast.success("Order saved successfully");
    } catch (error) {
      toast.error("Failed to save order");
      console.error("Error saving order:", error);
    } finally {
      addToCart(0)
      setLoading(false)
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="cartItems">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {
          Object.entries(cartItems).map(([key, value]) => {
            const foundItem = allItems.find((item) => item.id === key);
            // Handle case where item is not found to prevent errors
            if (!foundItem || value === 0) return null;

            return (
              <div key={foundItem.id}>
                <div className="cartitems-format">
                  <img
                    src={images[foundItem.image]}
                    alt={foundItem.name}
                    className="cart-icon"
                  />
                  <p>{foundItem.name}</p>
                  <p>${foundItem.new_price}</p>
                  <button className="cartitems-quantity">{value}</button>
                  <p>${foundItem.new_price * value}</p>
                  <img
                    src={remove_icon}
                    onClick={() => removeFromCart(key)}
                    alt="Remove"
                    className="remove-icon"
                  />
                </div>
                <hr />
              </div>
            );
          })
        }

        <div className="cartitems-sec">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>SubTotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>

            </div>
            <button onClick={() => saveOrder()}>{loading ? "ORDER PROCESSING" : "PROCEED TO CHEACKOUT"}</button>

          </div>
          <div className="cartitems-promo">
            <p>Enter a promo code here</p>
            <div className="cartitems-promocode">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
