// import { useState } from 'react'
import './App.css'

import SellerAccountPage from "./pages/seller/SellerAccountPage";
// import SellerListingsPage from "./pages/seller/SellerListingsPage";
// import ListingDetailPage from "./pages/seller/ListingDetailPage";
import AddListingPage from "./pages/seller/AddListingPage.jsx";
// import EditListingPage from "./pages/seller/EditListingPage";
import Login from "./pages/auth/login.jsx";
import { Link, Route, Routes } from 'react-router-dom';
import Buyer from './pages/buyer/BuyerDashboard.jsx';
import ListingDetails from './pages/buyer/LisitingDetails.jsx';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Bulldog Records
        </Link>
        {!isLoginPage && (
          <>
            <div className="navbar-search">
              <input type="text" placeholder="Search albums..." className="search-bar" />
            </div>

            <div className="navbar-links">
              <Link to="/" className="nav-link">
                Cart
              </Link>
              <Link to="/" className="nav-link">
                Orders
              </Link>
              <Link to="/" className="nav-link">
                Account
              </Link>
            </div>
          </>
        )}
      </nav>

      <Routes>
        {/* <Route path="/" element={<Navigate to="/seller" />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path='/listingDetails/:id' element={<ListingDetails />} />
        <Route path="/seller" element={<SellerAccountPage />} />
        {/* <Route path="/seller/listings" element={<SellerListingsPage />} /> */}
        <Route path="/seller/listings/add" element={<AddListingPage />} />
        {/* <Route path="/seller/listings/:id" element={<ListingDetailPage />} /> */}
        {/* <Route path="/seller/listings/:id/edit" element={<EditListingPage />} /> */}
      </Routes>


    </>
  )
}

export default App;
