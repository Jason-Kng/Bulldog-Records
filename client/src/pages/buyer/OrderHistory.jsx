import { useEffect, useState } from "react";
import { getOrders } from "../../api/buyerApi.js";
import OrderHistoryCard from "../../components/buyer/OrderHistoryCard.jsx";


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
      <h2>Order History</h2>
      <div className="order-results">
        {orders.map((order) => (
          <OrderHistoryCard key={order.orderID} orderObj={order} />
        ))}
      </div>


    </>
  )
}

export default OrderHistory;
