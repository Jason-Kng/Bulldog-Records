import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

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
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cvv, setCVV] = useState("");

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

  const taxRate = 0.07;

  let subTotal = 0;
  for (const item of items) {
    subTotal = subTotal + item.price * item.itemQuantity;
  }
  const tax = Math.round(subTotal * taxRate);
  const total = subTotal + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setMessage("Your cart is empty");
      return;
      if (cardNumber.length !== 16) {
        setMessage("Card number must be 16 digits");
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expDate)) {
        setMessage("Expiration must be MM/YYYY");
        return;
      }
      if (cvv.length < 3) {
        setMessage("CVV must be 3 or 4 digits");
        return;
      }
    }

    const shipping = { street: street, city: city, state: addrState, zip: zip };
    //null billing means "same as shipping" on the server
    let billing = null;
    if (!sameAddrCheck) {
      billing = {
        street: billingStreet,
        city: billingCity,
        state: billingAddrState,
        zip: billingZip,
      };
    }

    fetch("/api/cart/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ shipping: shipping, billing: billing }),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data: data })))
      .then(({ ok, data }) => {
        if (!ok) {
          let text = data.message;
          if (data.unavailable) {
            for (const item of data.unavailable) {
              text = text + ` ${item.title}: only ${item.available} left.`;
            }
          }
          setMessage(text);
          return;
        }
        navigate("/order-summary", {
          state: {
            orderID: data.orderID,
            items: items,
            subtotal: subTotal,
            tax: tax,
            total: total,
          },
        });
      })
      .catch(() => setMessage("Something went wrong. Try again."));
  };

  return (
    <div className="add-listing-form-container">
      <h2>Checkout</h2>
      <div className="add-listing-form">
        <form onSubmit={handlePlaceOrder}>
          <h4>Shipping Information</h4>
          <div>
            <p>
              <label>Name*</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </p>
            <br />
            <p>
              <label>Street*</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </p>
            <br />
            <p>
              <label>City*</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </p>
            <br />
            <p>
              <label>State*</label>
              <input
                type="text"
                value={addrState}
                onChange={(e) => setAddrState(e.target.value)}
                required
              />
            </p>
            <br />
            <p>
              <label>Zip*</label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </p>
            <br />
            <div className="same-address-container">
              <label>Billing Address Same as Shipping?</label>
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
                <label>Street*</label>
                <input
                  type="text"
                  value={billingStreet}
                  onChange={(e) => setBillingStreet(e.target.value)}
                  required
                />
              </p>
              <br />
              <p>
                <label>City*</label>
                <input
                  type="text"
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                  required
                />
              </p>
              <br />
              <p>
                <label>State*</label>
                <input
                  type="text"
                  value={billingAddrState}
                  onChange={(e) => setBillingAddrState(e.target.value)}
                  required
                />
              </p>
              <br />
              <p>
                <label>Zip*</label>
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
          <div>
            <p>
              <label>Cardholder Name*</label>
              <input
                type="text"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                required
              />
            </p>
            <br />
            <p>
              <label>Card Number*</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(e.target.value.replace(/\D/g, ""))
                }
                required
              />
            </p>
            <br />
            <p>
              <label>Expiration (MM/YYYY)*</label>
              <input
                type="text"
                maxLength={7}
                placeholder="MM/YYYY"
                value={expDate}
                onChange={(e) =>
                  setExpDate(e.target.value.replace(/[^\d/]/g, ""))
                }
                required
              />
            </p>
            <br />
            <p>
              <label>CVV*</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCVV(e.target.value.replace(/\D/g, ""))}
                required
              />
            </p>
          </div>
          <br />
          <button type="submit">Place Order</button>
        </form>
      </div>
      <p>{message}</p>
      <h2>Your Order</h2>
      {items.map((item) => (
        <div key={item.cartItemID}>
          <h4>{item.title}</h4>
          <p>{item.artist}</p>
          <img src={item.photo} alt={item.title} />
          <p>${(item.price / 100).toFixed(2)}</p>
          <p>Quantity: {item.itemQuantity}</p>
          <br />
        </div>
      ))}
      <br />
      <br />
      <h3>Subtotal: ${(subTotal / 100).toFixed(2)}</h3>
      <h3>Tax: ${(tax / 100).toFixed(2)}</h3>
      <h3>Total: ${(total / 100).toFixed(2)}</h3>
    </div>
  );
}
export default CheckoutPage;
