import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../../api/listingApi";
import "./OrderDetails.css";


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

  const order = orders[0];

  if (!order) {
    return <p>Loading order...</p>
  }

  const returnItem = (id) => {
    console.log(id);
  }


  console.log("Order: ", orders);
  const dateObj = new Date(order.dateCreated.replace(" ", "T"));
  const dateFormat = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });


  return (
    <>
      <div className="order-details">
        <div className="details-header">
          <h2>Order #{order.orderID}</h2>

          <div className="order-info">
            <p>Created: {dateFormat}</p>
            <p>Status: {order.orderStatus}</p>
            <p>Total: ${(order.orderTotalCost / 100).toFixed(2)}</p>
          </div>
        </div>

        <h3>Order Items</h3>

        <div className="order-items">
          {order.items.map((item) => (
            <div className="order-item" key={item.listingID}>
              <img src={item.photo} alt={item.title} className="order-details-item-image" />

              <div className="item-info">
                <h4>{item.title}</h4>
                <p>{item.artist}</p>
                <p>Seller: {item.sellerName}</p>
              </div>

              <div className="item-info-left">
                <p>Price: ${(item.price / 100).toFixed(2)}</p>
                <button onClick={() => returnItem(item.listingID)}>Return</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default OrderDetails;
