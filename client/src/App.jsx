import SellerAccountPage from "./pages/seller/SellerAccountPage";
import SellerListingsPage from "./pages/seller/SellerListingsPage";
import ListingPage from "./pages/seller/ListingPage";
import AddListingPage from "./pages/seller/AddListingPage.jsx";
import EditListingPage from "./pages/seller/EditListingPage";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import { Route, Routes } from "react-router-dom";
import Browse from "./pages/buyer/Browse.jsx";
import ListingDetails from "./pages/buyer/ListingDetails.jsx";
import NavBar from "./components/NavBar.jsx";
import Search from "./pages/buyer/SearchPage.jsx";
import CartPage from "./pages/buyer/CartPage.jsx";
import CheckoutPage from "./pages/buyer/CheckoutPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import AdminSellerApprovals from "./pages/admin/AdminSellerApproval";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrderSummary from "./pages/buyer/OrderSummary.jsx";
import NotFound from "./pages/NotFound.jsx";
import ApproveListings from "./pages/admin/listingApproval";

function App() {
  const [auth, setAuth] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("accessToken") || "",
  );

  useEffect(() => {
    const checkAuth = () => {
      const savedToken = localStorage.getItem("accessToken");
      if (!savedToken) {
        setToken("");
        setAuth(false);
        return;
      }

      try {
        const decoded = jwtDecode(savedToken);

        if (decoded.exp * 1000 > Date.now()) {
          setToken(savedToken);
          setAuth(true);
        } else {
          localStorage.removeItem("accessToken");
          setToken("");
          setAuth(false);
        }
      } catch {
        localStorage.removeItem("accessToken");
        setToken("");
        setAuth(false);
      }
    };

    const timer = setTimeout(checkAuth, 0);

    return () => clearTimeout(timer);
  }, []);

  if (auth === null) {
    return null;
  }

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<Login setAuth={setAuth} setToken={setToken} />}
        />
        {/* <Route path="/browse" element={<ProtectedRoute isAuth={auth} Component={Buyer} />} /> */}
        <Route path="/browse" element={<Browse />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/listingDetails/:id" element={<ListingDetails />} />
        <Route path="/seller" element={<ProtectedRoute isAuth={auth} Component={SellerAccountPage} allowedUsers={["seller"]} />} />
        <Route path="/seller/listings" element={<ProtectedRoute isAuth={auth} Component={SellerListingsPage} allowedUsers={["seller"]} />} />
        <Route path="/seller/listings/add" element={<AddListingPage />} />
        <Route path="/seller/listings/:id" element={<ListingPage />} />
        <Route path="/seller/listings/:id/edit" element={<EditListingPage />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/sellers"
          element={<AdminSellerApprovals token={token} />}
        />
        <Route
          path="/admin/listings"
          element={<ApproveListings token={token} />}
        />
      </Routes>
    </>
  );
}

export default App;
