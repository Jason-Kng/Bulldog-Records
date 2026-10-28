import { useState, useEffect } from "react";
// import Button from "../../components/Button";
import { getSellerAccountInfo } from "../../api/sellerApi";
import './seller.css';

// this file may be replaced after
// placeholder to test seller backend, basic seller account page

function SellerOrdersPage() {
  const [seller, setSeller] = useState(null);

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
      <h2>My Orders</h2>


      
    </div>
  );
}

export default SellerOrdersPage;
