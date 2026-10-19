import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  //changed username to email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
        if (data === null) {
          return;
        }
        console.log(data);
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);

          const decoded = jwtDecode(data.accessToken);

          if (decoded.userType === "buyer") {
            navigate("/browse");
          } else {
            navigate("/seller");
          }
        }
      })
      .catch((err) => console.error(err));
  };


  useEffect(() => {

    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    try {
      const decode = jwtDecode(token);

      if (decode.userType === "buyer") {
        navigate("/browse", { replace: true });
      } else if (decode.userType === "seller") {
        navigate("/seller", { replace: true });
      } else if (decode.userType === "admin") {
        console.log("admin");
      } else {
        return;
      }
    } catch (e) {
      console.log("Error: ", e);
    }


  }, [navigate])

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
      <p>{message}</p>
    </div>
  );
}

export default Login;
