import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../api/buyerApi";
import "./OrderDetails.css";


function OrderDetails() {
  let params = useParams();
  const [orders, setOrder] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrder(params.id);
        setOrder(data);
      } catch (error) {
        if (error.status === 404) {
          navigate("/404");
        } else {
          console.error(error);
        }
      }
    }

    fetchOrder();
  }, [params.id, navigate]);

  const order = orders[0];
  console.log("Orders: ", orders);

  if (!order) {
    return <p>Loading order...</p>
  }

  const returnItem = (id) => {
    console.log("returnItem order: ", order);
    navigate(`/return/${id}`, { state: { order, item: id } });
  }


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
                {order.orderStatus === "delivered" ? (
                  <button disabled={order.orderStatus !== "delivered"} onClick={() => returnItem(item.listingID)}>Return</button>

                ) : order.orderStatus === "returned" ? (
                  <p>Item has already been returned.</p>
                ) : (
                  <p>{order.orderStatus}</p>
                )}              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default OrderDetails;
