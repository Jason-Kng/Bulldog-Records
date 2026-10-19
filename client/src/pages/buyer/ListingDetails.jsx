import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListing } from "../../api/listingApi";
import "./ListingDetails.css";

function ListingDetails() {
  let navigate = useNavigate();
  let params = useParams();
  const [listing, setListing] = useState({});
  // console.log(params);

  useEffect(() => {
    getListing(params.id)
      .then(data => { setListing(data); })
      .catch(error => console.error('Error fetching listing: ', error));
  }, [params.id]);

  const handleAdd = () => {
    console.log("Add to cart");
  };
  const handleClick = () => {
    navigate(-1);

  };

  return (
    <>
      <div className="listing-details-page">
        <div className="listing-details-container">
          <div className="listing-details-image">
            {listing.photo && <img src={`..${listing.photo}`} alt={listing.title} />}
          </div>

          <div className="listing-details-info">
            <h1>{listing.title}</h1>
            <h2>{listing.artist}</h2>

            <p className="listing-details-price">
              ${(listing.price / 100).toFixed(2)}
            </p>

            <div className="listing-details-meta">
              <div className="listing-details">
                <p><strong>Media:</strong> {listing.mediaType}</p>
                <p><strong>Condition:</strong> {listing.condition}</p>
                <p><strong>Genre:</strong> {listing.genre}</p>
                <p><strong>Release Date:</strong> {listing.releaseDate}</p>
                <p><strong>Stock:</strong> {listing.stock}</p>
                <p><strong>Seller:</strong> {listing.sellerName}</p>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button type="button" className="back-button" onClick={() => handleClick()}>Back to Listings</button>
            <button type="button" className="add-cart-button" onClick={() => handleAdd()}>Add To Cart</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingDetails;

