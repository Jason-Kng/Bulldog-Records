import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("seller");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        userType,
        street,
        city,
        state: addrState,
        zip,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return navigate("/");
        } else if (res.status === 409) {
          setMessage("Email already registered");
        } else {
          setMessage("Please check your fields");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Something went wrong. Try again.");
      });
  };

  return (
    <div className="add-listing-form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="userType"
            value="seller"
            checked={userType === "seller"}
            onChange={(e) => setUserType(e.target.value)}
          />
          Seller
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="buyer"
            checked={userType === "buyer"}
            onChange={(e) => setUserType(e.target.value)}
          />
          Buyer
        </label>
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
            Email*
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password*
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Confirm Password*
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
export default Register;
