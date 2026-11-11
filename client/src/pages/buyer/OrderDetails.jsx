import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../../api/listingApi";


function OrderDetails() {
  let params = useParams();
  const [orders, setOrder] = useState([]);

  console.log("Params", params);
  console.log(params.id)

  useEffect(() => {
    console.log("Fetching Orders");
    async function fetchOrder() {
      try {
        const data = await getOrder(params.id);
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrder();
  }, [params.id]);


  console.log("Order: ", orders);

  return (
    <>
      <h2>Order Details</h2>

      {orders.map((order) => (
        <>
          <p>Order ID: {order.orderID}</p>
          <p>Total Cost: ${(order.orderTotalCost / 100).toFixed(2)}</p>
          <p>Order Status: {order.orderStatus}</p>

        </>
      ))}
    </>
  )
}

export default OrderDetails;
