import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  if (!order) {
    return (
      <div>
        <p>No order to show.</p>
        <button onClick={() => navigate("/browse")}>Back to Browse</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Your order has been placed!</h2>
      <p>Order #{order.orderID}</p>
      <p>Thank you for your purchase.</p>

      <h3>Order Details</h3>
      {order.items.map((item) => (
        <div key={item.cartItemID}>
          <img src={item.photo} alt={item.title} />
          <p>{item.title}</p>
          <p>{item.artist}</p>
          <p>
            ${(item.price / 100).toFixed(2)} x {item.itemQuantity} = $
            {((item.price * item.itemQuantity) / 100).toFixed(2)}
          </p>
        </div>
      ))}

      <p>Subtotal: ${(order.subtotal / 100).toFixed(2)}</p>
      <p>Tax (7%): ${(order.tax / 100).toFixed(2)}</p>
      <p>Total: ${(order.total / 100).toFixed(2)}</p>

      <button onClick={() => navigate("/browse")}>Continue Shopping</button>
    </div>
  );
}
export default OrderSummary;
