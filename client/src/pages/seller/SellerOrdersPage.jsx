import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrders } from "../../api/sellerApi";
import "./seller.css";

const STATUSES = ["canceled", "pending", "shipped", "delivered"];

function SellerOrdersPage() {
  const [orders, setOrders] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data))
      .catch((err) => alert(err.message));
  }, []);

  // group items by orderID
  const groupedOrders = orders
    ? Object.values(
        orders.reduce((groups, item) => {
          if (!groups[item.orderID]) {
            groups[item.orderID] = {
              ...item,
              items: [],
              totalQuantity: 0,
              totalCost: 0,
            };
          }

          groups[item.orderID].items.push(item);
          groups[item.orderID].totalQuantity += item.itemQuantity;
          groups[item.orderID].totalCost += item.price * item.itemQuantity;

          return groups;
        }, {})
      )
    : [];

  // "all" = four columns, otherwise just the selected status
  const columns = statusFilter === "all" ? STATUSES : [statusFilter];

  return (
    <div className="listings-container">
      <h2>My Orders</h2>

      <div className="listings-buttons-container">
        <button
          type="button"
          className="seller-view-listings-button"
          onClick={() => navigate("/seller")}
        >
          My Account
        </button>
      </div>

      {groupedOrders.length === 0 && <p>No orders yet</p>}

      <div className="seller-orders-buttons-container">
        <button
          type="button"
          className={`seller-view-orders-button ${statusFilter === "all" ? "active" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          All
        </button>

        <button
          type="button"
          className={`seller-view-orders-button ${statusFilter === "canceled" ? "active" : ""}`}
          onClick={() => setStatusFilter("canceled")}
        >
          Canceled
        </button>

        <button
          type="button"
          className={`seller-view-orders-button ${statusFilter === "pending" ? "active" : ""}`}
          onClick={() => setStatusFilter("pending")}
        >
          Pending
        </button>

        <button
          type="button"
          className={`seller-view-orders-button ${statusFilter === "shipped" ? "active" : ""}`}
          onClick={() => setStatusFilter("shipped")}
        >
          Shipped
        </button>

        <button
          type="button"
          className={`seller-view-orders-button ${statusFilter === "delivered" ? "active" : ""}`}
          onClick={() => setStatusFilter("delivered")}
        >
          Delivered
        </button>
      </div>

      {orders === null ? (
        <p>Loading orders...</p>
      ) : (
        <div className="seller-listings-divider">
          {columns.map((status) => {
            const statusOrders = groupedOrders.filter(
              (order) => order.orderStatus === status
            );

            // if there are listings with that status, show them
            if (statusOrders.length === 0) return null;

            return (
              <ul key={status}>
                {statusOrders.map((order) => (
                  <li
                    key={order.orderID}
                    className={`listings-container-li ${status}`}
                  >
                    <Link to={`/seller/orders/${order.orderID}`}>
                      <div className="listing-page-header-container">
                        <p className="listing-page-title">
                          Order #{order.orderID}
                        </p>

                        <div className="status-container">
                          <div className={`status-circle ${status}`}></div>
                          <p className={`listing-page-status ${status}`}>
                            {status}
                          </p>
                        </div>
                      </div>

                      <p className="listing-page-stock">
                        Buyer: {order.buyerName}
                      </p>

                      <p className="listing-page-stock">
                        Total Items: {order.totalQuantity}
                      </p>

                      <p className="listing-page-price">
                        Total: ${(order.totalCost / 100).toFixed(2)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            );
          })}
      </div>
      )}
    </div>
  );
}

export default SellerOrdersPage;