// import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SellerAccountPage from "./pages/seller/SellerAccountPage";
import SellerListingsPage from "./pages/seller/SellerListingsPage";
import ListingDetailPage from "./pages/seller/ListingDetailPage";
import AddListingPage from "./pages/seller/AddListingPage";
import EditListingPage from "./pages/seller/EditListingPage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/seller" />} />
        <Route path="/seller" element={<SellerAccountPage />} />
        <Route path="/seller/listings" element={<SellerListingsPage />} />
        <Route path="/seller/listings/add" element={<AddListingPage />} />
        <Route path="/seller/listings/:id" element={<ListingDetailPage />} />
        <Route path="/seller/listings/:id/edit" element={<EditListingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;