import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Button from "../../components/Button";
import { getOrder } from "../../api/sellerApi";


import './seller.css';

function OrderPage() {
  const [order, setOrder] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getOrder(id)
      .then((data) => setOrder(data))
      .catch((err) => alert(err.message));


  }, [id]);

  if (!order) {
    return <h3>Retrieving Order Data...</h3>;
  }

  if (order.length === 0) {
    return <h3>Order not found</h3>;
  }

  // order-level info is the same in every row, so use the first one
  const info = order[0];

  let totalQuantity = 0;
  let totalCost = 0;

  for (const item of order) {
    totalQuantity += item.itemQuantity;
    totalCost += item.price * item.itemQuantity;
  }

  return (
    <div class="listings-container">
      <h2>Order #{info.orderID}</h2>

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

        <button
          type="button"
          className="seller-view-listings-button"
          onClick={() => navigate("/seller/orders")}
        >
          My Orders
        </button>

      </div>
      <h3>Order Details</h3>

      <div>
        <p>Order Status: {info.orderStatus}</p>
        <p>Date Created: {info.dateCreated}</p>
        <p>Total Items: {totalQuantity}</p>
        <p>Total Cost: ${(totalCost / 100).toFixed(2)}</p>
        <p>Buyer Name: {info.buyerName}</p>
        <p>Buyer Email: {info.buyerEmail}</p>

        <h4>Shipping Address</h4>
        <p>{info.shippingStreet}</p>
        <p>{info.shippingCity}, {info.shippingState},</p>
        <p>{info.shippingZip}, {info.shippingCountry}</p>

        <h4>Billing Address</h4>
        <p>{info.billingStreet}</p>
        <p>{info.billingCity}, {info.billingState},</p>
        <p>{info.billingZip}, {info.billingCountry}</p>
      </div>

      <div>

      
        
      
      </div>

      <h3>Order Items</h3>
      <ul>
        {order
          .map((item) => (
            <li key={item.orderItemID} className="listings-container-li">
              <p class="listing-page-title">{item.listingTitle}</p>
              <p class="listing-page-stock">Item Status: {item.orderItemStatus}</p>

              <p class="listing-page-stock">Quantity: {item.itemQuantity}</p>
              <p class="listing-page-stock">Price: ${(item.price / 100).toFixed(2)}</p>
            </li>
            
          ))
          
          }
        
      </ul>



    </div>
  )


}

export default OrderPage;