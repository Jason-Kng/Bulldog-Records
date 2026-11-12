import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postReturn } from "../../api/buyerApi";

function RefundForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, item } = location.state || {};
  console.log("order: ", order);

  const [listingID, setListingID] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const selectedItem = order?.items?.find((orderItem) => String(orderItem.listingID) === String(item));

  const reasons = [
    "Item arrived damaged",
    "Wrong item received",
    "Item not as described",
    "No longer needed",
    "Other",
  ];

  if (!order) {
    return (
      <div>
        <p>No order selected.</p>
        <button onClick={() => navigate("/order-history")}>
          Back to Order History
        </button>
      </div>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const returnObj = {
      orderID: order.orderID,
      orderItemID: selectedItem.orderItemID,
      listingID: selectedItem.listingID,
      quantity: quantity,
      reason: reason,
    }

    try {
      await postReturn(returnObj);
      navigate("/order-history")
    } catch (e) {
      setMessage(e.message);
    }

    console.log("Return Obj: ", returnObj);
    setMessage("Your refund request has been submitted.");
  };

  return (
    <div className="add-listing-form-container">
      <h2>Request a Refund</h2>
      <p>Order #{order.orderID}</p>
      <div className="add-listing-form">
        <form onSubmit={handleSubmit}>
          <p>
            <label>Item</label>
            <select
              value={listingID}
              onChange={(e) => setListingID(e.target.value)}
              required
            >
              <option value="">Choose an item</option>
              {order.items.map((item) => (
                <option key={item.listingID} value={item.listingID}>
                  {item.title} - {item.artist}
                </option>
              ))}
            </select>
          </p>
          <br />
          <p>
            <label>Quantity</label>
            <input
              type="number"
              min={1}
              max={Number(selectedItem?.quantity ?? 1)}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </p>
          <br />
          <p>
            <label>Reason*</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">Choose a reason</option>
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </p>
          <br />
          <button type="submit">Submit Refund</button>
        </form>
      </div>
      <p>{message}</p>
      <button onClick={() => navigate("/order-history")}>
        Back to Order History
      </button>
    </div>
  );
}
export default RefundForm;
