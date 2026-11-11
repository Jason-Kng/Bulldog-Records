import { useState, useEffect } from "react";
// import Button from "../../components/Button";
import { getReturns } from "../../api/sellerApi";
import { useNavigate } from "react-router-dom";
import './seller.css';

// this file may be replaced after
// placeholder to test seller backend, basic seller account page

function SellerReturnsPage() {
  const [returns, setReturns] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getReturns()
      .then((data) => setReturns(data))
      .catch((err) => alert(err.message));
  }, []);

  if (!returns) {
    return <h3>Retrieving Account Data...</h3>;
  }

  return (
    <div class="listings-container">
    
      <h2>Returns</h2>

      <div class="listings-buttons-container">
        {/* <button
            type="button"
            className="seller-view-listings-button"
            onClick={() => navigate("/seller/")}
          >
            My Account
        </button> */}
        <button
          type="button"
          className="seller-view-listings-button"
          onClick={() => navigate("/seller")}
        >
          My Account
        </button>

      </div>

      {returns.length === 0 && <p>No returns yet</p>}

      <ul>
        {returns.map((item) => (
          <li key={item.returnID} className="listings-container-li">
            <p className="listing-page-title">{item.listingTitle}</p>
            <p className="listing-page-stock">Order #{item.orderID}</p>
            <p className="listing-page-stock">Quantity: {item.returnQuantity}</p>
            <p className="listing-page-price">Price: ${(item.price / 100).toFixed(2)}</p>
            <p className="listing-page-stock">Buyer Name: {item.buyerName}</p>
            <p className="listing-page-stock">Buyer Email: {item.buyerEmail}</p>
            <p className="listing-page-stock">Date Requested: {item.dateRequested}</p>
            <p className="return-reason">Return Reason:</p>
            <p className="listing-page-stock">{item.reason}</p>
          </li>
        ))}
      </ul>

      
    </div>
  );
}

export default SellerReturnsPage;
