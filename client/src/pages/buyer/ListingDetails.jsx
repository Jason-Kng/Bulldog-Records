import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListing } from "../../api/listingApi";
import "./ListingDetails.css";

function ListingDetails() {
  let navigate = useNavigate();
  let params = useParams();
  const [listing, setListing] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  // console.log(params);

  useEffect(() => {
    getListing(params.id)
      .then((data) => {
        setListing(data);
      })
      .catch((error) => console.error("Error fetching listing: ", error));
  }, [params.id]);

  const handleAdd = () => {
    fetch("/api/cart/items/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        quantity,
        listingID: listing.listingID,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return setMessage("Added to cart!"); //navigate("/cart");
        } else if (res.status === 400) {
          setMessage("Out of Stock");
        } else if (res.status === 403) {
          setMessage("Not a buyer");
        } else if (res.status === 404) {
          setMessage("Listing not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Something went wrong. Try again.");
      });
  };

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="listing-details-page">
        <div className="listing-details-container">
          <div className="listing-details-image">
            {listing.photo && (
              <img src={`..${listing.photo}`} alt={listing.title} />
            )}
          </div>

          <div className="listing-details-info">
            <h1>{listing.title}</h1>
            <h2>{listing.artist}</h2>

            <p className="listing-details-price">
              ${(listing.price / 100).toFixed(2)}
            </p>

            <div className="listing-details-meta">
              <div className="listing-details">
                <p>
                  <strong>Media:</strong> {listing.mediaType}
                </p>
                <p>
                  <strong>Condition:</strong> {listing.condition}
                </p>
                <p>
                  <strong>Genre:</strong> {listing.genre}
                </p>
                <p>
                  <strong>Release Date:</strong> {listing.releaseDate}
                </p>
                <p>
                  <strong>Stock:</strong> {listing.stock}
                </p>
                <p>
                  <strong>Seller:</strong> {listing.sellerName}
                </p>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button
              type="button"
              className="back-button"
              onClick={() => handleClick()}
            >
              Back to Listings
            </button>
            <div className="cart-controls">
              <button
                type="button"
                className="add-cart-button"
                onClick={() => handleAdd()}
                disabled={listing.stock === 0}
              >
                Add To Cart
              </button>
              <div className="quantity-controls">
                <button
                  type="button"
                  className="quantity-button"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  className="quantity-button"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= listing.stock}
                >
                  +
                </button>
              </div>
            </div>
            <p className="cart-message">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingDetails;
