import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [checkoutMessage, setCheckoutMessage] = useState("");

  // Calculate total number of plants in the cart
  const totalCartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Convert "$15" into 15
  const getNumericCost = (cost) => {
    return parseFloat(cost.replace("$", ""));
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const price = getNumericCost(item.cost);

        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Continue shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = getNumericCost(item.cost);

    return (price * item.quantity).toFixed(2);
  };

  // Checkout
  const handleCheckout = () => {
    setCheckoutMessage("Coming Soon");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Shopping Cart
      </h2>

      <h3 style={{ color: "black" }}>
        Total Cart Quantity: {totalCartQuantity}
      </h3>

      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3 style={{ color: "black" }}>
            Your cart is empty.
          </h3>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              className="cart-item"
              key={item.name}
            >
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">
                <div className="cart-item-name">
                  {item.name}
                </div>

                <div className="cart-item-cost">
                  Unit Price: {item.cost}
                </div>

                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() =>
                      handleDecrement(item)
                    }
                  >
                    -
                  </button>

                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>

                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() =>
                      handleIncrement(item)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item)}
                </div>

                <button
                  className="cart-item-delete"
                  onClick={() =>
                    handleRemove(item)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          color: "black",
        }}
        className="total_cart_amount"
      >
        <h3>
          Total Items: {totalCartQuantity}
        </h3>

        <h3>
          Total Cost: ${calculateTotalAmount()}
        </h3>
      </div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          className="get-started-button1"
          onClick={handleCheckout}
        >
          Checkout
        </button>

        {checkoutMessage && (
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            {checkoutMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItem;