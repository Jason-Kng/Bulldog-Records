// import { useState } from 'react'
import './App.css'

import {Routes, Route } from "react-router-dom";
import SellerAccountPage from "./pages/seller/SellerAccountPage";
import SellerListingsPage from "./pages/seller/SellerListingsPage";
import ListingPage from "./pages/seller/ListingPage";
import AddListingPage from "./pages/seller/AddListingPage";
import EditListingPage from "./pages/seller/EditListingPage";

function App() {
  return (
    <Routes>
      <Route path="/seller" element={<SellerAccountPage />} />
      <Route path="/seller/listings" element={<SellerListingsPage />} />
      <Route path="/seller/listings/add" element={<AddListingPage />} />
      <Route path="/seller/listings/:id" element={<ListingPage />} />
      <Route path="/seller/listings/:id/edit" element={<EditListingPage />} />
    </Routes>
  );
}

export default App;