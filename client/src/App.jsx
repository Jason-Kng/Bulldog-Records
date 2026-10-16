// import { useState } from 'react'
import './App.css'

import SellerAccountPage from "./pages/seller/SellerAccountPage";
import SellerListingsPage from "./pages/seller/SellerListingsPage";
// import ListingDetailPage from "./pages/seller/ListingDetailPage";
import AddListingPage from "./pages/seller/AddListingPage.jsx";
import EditListingPage from "./pages/seller/EditListingPage";
import { Link, Route, Routes } from 'react-router-dom';
// import Login from './login.jsx';
import Buyer from './pages/buyer/buyerDashboard.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Bulldog Records
        </Link>

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
      </nav>

      <Routes>
        {/* <Route path="/" element={<Navigate to="/seller" />} /> */}
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/seller" element={<SellerAccountPage />} />
        <Route path="/seller/listings" element={<SellerListingsPage />} />
        <Route path="/seller/listings/add" element={<AddListingPage />} />
        {/* <Route path="/seller/listings/:id" element={<ListingDetailPage />} /> */}
        <Route path="/seller/listings/:id/edit" element={<EditListingPage />} />
      </Routes>


    </>
  )
}

export default App;
