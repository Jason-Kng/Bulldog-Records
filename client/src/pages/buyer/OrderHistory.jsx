import { useEffect, useState } from "react";
import { getOrders } from "../../api/buyerApi.js";
import OrderHistoryCard from "../../components/buyer/OrderHistoryCard.jsx";
import "./OrderHistory.css";


function OrderHistory() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    console.log("Fetching Orders");
    async function fetchOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrders();
  }, []);



  return (
    <>
      <div className="order-history-page">
        <h2>Order History</h2>

        <div className="order-results">
          {orders.map((order) => (
            <OrderHistoryCard key={order.orderID} orderObj={order} />
          ))}
        </div>

      </div>

    </>
  )
}

export default OrderHistory;
