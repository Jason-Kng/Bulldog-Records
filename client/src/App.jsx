import SellerAccountPage from "./pages/seller/SellerAccountPage";
// import SellerListingsPage from "./pages/seller/SellerListingsPage";
// import ListingDetailPage from "./pages/seller/ListingDetailPage";
import AddListingPage from "./pages/seller/AddListingPage.jsx";
// import EditListingPage from "./pages/seller/EditListingPage";
import Login from "./pages/auth/Login.jsx";
import { Route, Routes } from 'react-router-dom';
import Browse from './pages/buyer/Browse.jsx';
import ListingDetails from './pages/buyer/ListingDetails.jsx';
import NavBar from "./components/NavBar.jsx";
import Search from "./pages/buyer/SearchPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";


function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setAuth(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          setAuth(true);
        } else {
          localStorage.removeItem("accessToken");
          setAuth(false);
        }
      } catch {
        localStorage.removeItem("accessToken");
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
        {/* <Route path="/" element={<Navigate to="/seller" />} /> */}
        <Route path="/" element={<Login setAuth={setAuth} />} />
        {/* <Route path="/browse" element={<ProtectedRoute isAuth={auth} Component={Buyer} />} /> */}
        <Route path="/browse" element={<Browse />} />
        <Route path="/search" element={<Search />} />
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
