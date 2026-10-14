import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  //changed username to email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send to your backend here
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          setMessage("Invalid Email or Password");
          return null;
        }
        return res.json();
      }) //{res.json())
      .then((data) => {
        if (data.success) {
          navigate("/hello");
        } else {
          setMessage(data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <button type="submit" onClick={handleClick}>
        Create Account
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
