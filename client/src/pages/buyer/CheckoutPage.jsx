import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [zip, setZip] = useState("");
  const [shipping, setShipping] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [sameAddrCheck, setSameAddrCheck] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/checkout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (!res.ok) {
        setMessage("Please Login as a Buyer");
        return null;
      }
      return res.json();
    });
  }, []);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setMessage("Order Placed");
  };
  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handlePlaceOrder}>
        <h4>Shipping Information</h4>
        <div>
          <label>
            Name*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Street*
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            City*
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            State*
            <input
              type="text"
              value={addrState}
              onChange={(e) => setAddrState(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Zip*
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Billing Address Same as Shipping?
            <input
              type="checkbox"
              checked={sameAddrCheck}
              onChange={(e) => setSameAddrCheck(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Place Order</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
export default CheckoutPage;
