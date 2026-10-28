import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Checkout.css';

function CheckoutPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [zip, setZip] = useState("");
  const [billingStreet, setBillingStreet] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingAddrState, setBillingAddrState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [sameAddrCheck, setSameAddrCheck] = useState(true);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

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

  let total = 0;
  for (const item of items) {
    total = total + item.price * item.itemQuantity;
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setMessage("Your cart is empty");
      return;
    } else {
      navigate("/order-summary");
    }
  };

  return (
    <div className="add-listing-form-container">
      <h2>Checkout</h2>
      <div className="add-listing-form">
      <form onSubmit={handlePlaceOrder}>
        <h4>Shipping Information</h4>
        <div>
          <p>
            <label>
              Name*
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
          </p>
          <br />
          <p>
          <label>
            Street*</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          
          </p>
          <br />
          <p>
          <label>
            City*</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          
          </p>
          <br />
          <p>
          <label>
            State*</label>
            <input
              type="text"
              value={addrState}
              onChange={(e) => setAddrState(e.target.value)}
              required
            />
          
          </p>
          <br />
          <p>
          <label>
            Zip*</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          
          </p>
          <br />
          <div className="same-address-container">
            <label>
              Billing Address Same as Shipping?</label>
              <input
                type="checkbox"
                checked={sameAddrCheck}
                onChange={(e) => setSameAddrCheck(e.target.checked)}
                className="same-address-input"
              />
            
          </div>
        </div>
        {!sameAddrCheck && (
          <div>
            <h4>Billing Information</h4>
            <p>
            <label>
              Street*</label>
              <input
                type="text"
                value={billingStreet}
                onChange={(e) => setBillingStreet(e.target.value)}
                required
              />
            
            </p>
            <br />
            <p>
            <label>
              City*</label>
              <input
                type="text"
                value={billingCity}
                onChange={(e) => setBillingCity(e.target.value)}
                required
              />
            
            </p>
            <br />
            <p>
            <label>
              State*</label>
              <input
                type="text"
                value={billingAddrState}
                onChange={(e) => setBillingAddrState(e.target.value)}
                required
              />
            
            </p>
            <br />
            <p>
            <label>
              Zip*</label>
              <input
                type="text"
                value={billingZip}
                onChange={(e) => setBillingZip(e.target.value)}
                required
              />
            
            </p>
            <br />
          </div>
        )}
        <br />
        <h4>Payment Method</h4>
        <br />
        <br />
        <button type="submit">Place Order</button>
      </form>
      </div>
      <p>{message}</p>
      <h2>Your Order</h2>
      {items.map((item) => (
        <div key={item.cartItemID}>
          <p>{item.title}</p>
          <p>{item.artist}</p>
          <img src={item.photo} alt={item.title} />
          <p>${(item.price / 100).toFixed(2)}</p>
          <p>Quantity: {item.itemQuantity}</p>
        </div>
      ))}
      <p>Total: ${(total / 100).toFixed(2)}</p>
    </div>
  );
}
export default CheckoutPage;
