import SellerAccountPage from "./pages/seller/SellerAccountPage";
// import SellerListingsPage from "./pages/seller/SellerListingsPage";
// import ListingDetailPage from "./pages/seller/ListingDetailPage";
import AddListingPage from "./pages/seller/AddListingPage.jsx";
// import EditListingPage from "./pages/seller/EditListingPage";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import { Route, Routes } from "react-router-dom";
import Buyer from "./pages/buyer/BuyerDashboard.jsx";
import ListingDetails from "./pages/buyer/ListingDetails.jsx";
import NavBar from "./components/NavBar.jsx";
import Search from "./pages/buyer/SearchPage.jsx";
import CartPage from "./pages/buyer/CartPage.jsx";
import CheckoutPage from "./pages/buyer/CheckoutPage.jsx";

function App() {
  // const location = useLocation();
  // const isLoginPage = location.pathname === "/";

  return (
    <>
      <NavBar />

      <Routes>
        {/* <Route path="/" element={<Navigate to="/seller" />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<Buyer />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/listingDetails/:id" element={<ListingDetails />} />
        <Route path="/seller" element={<SellerAccountPage />} />
        {/* <Route path="/seller/listings" element={<SellerListingsPage />} /> */}
        <Route path="/seller/listings/add" element={<AddListingPage />} />
        {/* <Route path="/seller/listings/:id" element={<ListingDetailPage />} /> */}
        {/* <Route path="/seller/listings/:id/edit" element={<EditListingPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
