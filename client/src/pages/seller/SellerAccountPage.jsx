import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { getSeller } from "../../api/sellerApi";

// this file may be replaced after
// placeholder to test seller backend, basic seller account page

function SellerAccountPage() {
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSeller()
      .then((data) => setSeller(data))
      .catch((err) => alert(err.message));
  }, []);

  if (!seller) {
    return <h3>Retrieving Account Data...</h3>;
  }

  return (
    <div>
      <h1>Seller Account</h1>
      <p>Seller ID: {seller.sellerID}</p>
      <p>User ID: {seller.userID}</p>
      <p>Address ID: {seller.addressID}</p>
      <p>Approval Status: {seller.approvalStatus}</p>
      <p>Account Status: {seller.accountStatus}</p>

      <Button text="View Listings" onClick={() => navigate("/seller/listings")} />
    </div>
  );
}

export default SellerAccountPage;
