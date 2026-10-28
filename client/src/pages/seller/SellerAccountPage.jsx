import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "../../components/Button";
import { getSellerAccountInfo } from "../../api/sellerApi";
import './seller.css';

// this file may be replaced after
// placeholder to test seller backend, basic seller account page

function SellerAccountPage() {
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSellerAccountInfo()
      .then((data) => setSeller(data))
      .catch((err) => alert(err.message));
  }, []);

  if (!seller) {
    return <h3>Retrieving Account Data...</h3>;
  }

  return (
    <div className="seller-account-container">
      <h2>Seller Account</h2>
      <p>Name: {seller.name}</p>
      <p>Email: {seller.email}</p>
      <p>Approval Status: {seller.approvalStatus}</p>
      <p>Account Status: {seller.accountStatus}</p>

      <div className="seller-account-page-buttons-container">
      <button
        type="button"
        className="seller-view-listings-button"
        onClick={() => navigate("/seller/listings")}
      >
        View Listings
      </button>
      <button
        type="button"
        className="seller-view-listings-button"
        onClick={() => navigate("/seller")}
      >
        View Sales
      </button>
      <button
        type="button"
        className="seller-view-listings-button"
        onClick={() => navigate("/seller")}
      >
        View Returns
      </button>
      </div>

      
    </div>
  );
}

export default SellerAccountPage;
