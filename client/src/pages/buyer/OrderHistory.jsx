import { useEffect, useState } from "react";
import { getOrders } from "../../api/listingApi.js";
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


  console.log("ORDERS: ", orders);

  return (
    <>
      {/* <div> */}
      {/*   {orders.map(order => ( */}
      {/*     <div key={order.orderID}> */}
      {/*       <h2>Order #{order.orderID}</h2> */}
      {/*       <p>Status: {order.orderStatus}</p> */}
      {/**/}
      {/*       {order.items.map(item => ( */}
      {/*         <div key={item.listingID}> */}
      {/*           <h3>{item.title}</h3> */}
      {/*           <p>{item.artist}</p> */}
      {/*           <p>Seller: {item.sellerName}</p> */}
      {/*         </div> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   ))} */}
      {/**/}


      <h2>Order History</h2>
      <div className="order-results">
        {orders.map((order) => (
          <OrderHistoryCard key={order.orderID} orderObj={order} />
        ))}
        {/* <div className="Orders-results"> */}

        {/* {orders.map((order) => ( */}
        {/* <OrderHistoryCard listingID={order.listingID} orderID={order.orderID} orderStatus={order.orderStatus} */}
        {/* seller={order.name} image={order.photo} title={order.title} artist={order.artist} price={order.orderTotalCost} /> */}
        {/* ))} */}
        {/* </div> */}

      </div>


    </>
  )
}

export default OrderHistory;
