import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getListing, removeListing } from "../../api/sellerApi";
import './seller.css';

function ListingPage() {
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getListing(id)
      .then((data) => setListing(data))
      .catch((err) => alert(err.message));
  }, [id]);

  function confirmRemove() {

    if (!window.confirm("Remove Listing")) {
      return;
    }

    removeListing(id)
      .then(() => navigate("/seller/listings/"))
      .catch((error) => alert(error.message))

  }

  if (!listing) {
    return <h3>Retrieving Listing Data...</h3>;
  }

  return (
    <>
      <div className="listing-details-page">
        <div className="listing-details-container">
          <div className="listing-details-image">
            {listing.photo && (
              <img src={listing.photo} alt={listing.title} />
            )}
          </div>

          <div className="listing-details-info">
            <h1>{listing.title}</h1>
            <h2>{listing.artist}</h2>

            <p className="listing-details-price">
              ${(listing.price).toFixed(2)}
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
                  <strong>Barcode:</strong> {listing.EAN}
                </p>
                <p>
                  <strong>Status:</strong> {listing.listingStatus}
                </p>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(`/seller/listings/${id}/edit`)}
            >
              Edit Listing
            </button>

            <button
              type="button"
              className="back-button"
              onClick={confirmRemove}
            >
              Remove Listing
            </button>


            {/* <Button text="My Listings" onClick={() => navigate(`/seller/listings`)} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingPage;


