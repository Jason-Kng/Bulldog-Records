import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/cart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          setMessage("Please Login as a Buyer");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }
        if (data.length === 0) {
          setMessage("Your cart is empty");
          return;
        } else {
          setItems(data);
        }
      })
      .catch(() => setMessage("Something went wrong. Try again."));
  }, []);
  const handleRemove = (listingID) => {
    fetch(`/api/cart/items/${listingID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          const newItems = [];
          for (const item of items) {
            if (item.listingID !== listingID) {
              newItems.push(item);
            }
          }
          setItems(newItems);
          setMessage("Item Removed");
        } else {
          setMessage("Error");
        }
      })
      .catch(() => setMessage("Something went wrong. Try again."));
  };
  const handleCheckout = () => {
    if (items.length === 0) {
      setMessage("Your cart is empty");
      return;
    } else {
      navigate("/checkout");
    }
  };
  let total = 0;
  for (const item of items) {
    total = total + item.price * item.itemQuantity;
  }
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.map((item) => (
        <div className="cart-item" key={item.cartItemID}>
          <p className="cart-item-title">{item.title}</p>
          <p>{item.artist}</p>
          <img src={item.photo} alt={item.title} />
          <p>${(item.price / 100).toFixed(2)}</p>
          <p>Quantity: {item.itemQuantity}</p>
          <button
            className="remove-button"
            type="button"
            onClick={() => handleRemove(item.listingID)}
          >
            Remove
          </button>
        </div>
      ))}
      <p className="cart-total">Total: ${(total / 100).toFixed(2)}</p>
      <button
        className="checkout-button"
        type="button"
        onClick={() => handleCheckout()}
      >
        Checkout
      </button>
      <p className="cart-message">{message}</p>
    </div>
  );
}
export default CartPage;
