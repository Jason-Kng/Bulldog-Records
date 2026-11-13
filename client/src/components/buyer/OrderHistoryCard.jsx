import { useNavigate } from "react-router-dom";
import "./OrderHistoryCard.css";

// listingID, orderID, orderStatus, seller, image, title, artist, price, date 
function OrderHistoryCard({ orderObj }) {
  const dateObj = new Date(orderObj.dateCreated.replace(" ", "T"));
  const dateFormat = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(id);
    navigate(`/order-details/${id}`)

  };

  return (
    <div className="order-history-card-container" onClick={() => handleClick(orderObj.orderID)} >
      <div className="order-history-card-top">
        {orderObj.orderID && <h2 className="order-history-card-title">Order #{orderObj.orderID}</h2>}
        {dateFormat && <p className="order-history-card-date">Placed {dateFormat}</p>}
        <span className="order-history-card-status">{orderObj.orderStatus}</span>
      </div>
      <div className="order-history-card-middle">
        {orderObj.items.map(item => (
          <img key={item.listingID} src={item.photo} alt={item.title} className="order-history-images" />
        ))}

        <div className="order-history-middle-info">
          <p className="order-history-num-items">{orderObj.items.length} {orderObj.items.length === 1 ? 'item' : 'items'}</p>
          <p className="order-history-titles">{orderObj.items.slice(0, 3).map(item => item.title).join(", ")}</p>
        </div>

      </div>
      <div className="order-history-card-bottom">
        <p className="order-total">Order total:</p>
        <h2>${(orderObj.orderTotalCost / 100).toFixed(2)}</h2>

      </div>
    </div>
  )
}

export default OrderHistoryCard;


