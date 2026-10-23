import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { getSellerAccountInfo } from "../../api/sellerApi";

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
    <div>
      <h1>Seller Account</h1>
      <p>Name: {seller.name}</p>
      <p>Email: {seller.email}</p>
      <p>Approval Status: {seller.approvalStatus}</p>
      <p>Account Status: {seller.accountStatus}</p>

      <Button text="View Listings" onClick={() => navigate("/seller/listings")} />
    </div>
  );
}

export default SellerAccountPage;
