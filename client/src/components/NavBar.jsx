import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./NavBar.css";

function getHomeRoute() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return "/";
  }

  const decoded = jwtDecode(token);

  if (decoded.exp > Date.now()) {
    localStorage.removeItem("accessToken");
    return "/";
  }

  if (decoded.userType === "buyer") {
    return "/browse";
  }

  if (decoded.userType === "seller") {
    return "/seller";
  }

  return "/";
}

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    if (search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="navbar">
        <Link to={getHomeRoute()} className="navbar-brand">
          Bulldog Records
        </Link>
        {!isLoginPage && (
          <>
            <form className="navbar-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search albums..."
                className="search-bar"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>

            <div className="navbar-links">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
              <Link to="/" className="nav-link">
                Orders
              </Link>
              {/* <Link to="/" className="nav-link"> */}
              {/* Account */}
              {/* </Link> */}
              <button
                type="button"
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

export default NavBar;
