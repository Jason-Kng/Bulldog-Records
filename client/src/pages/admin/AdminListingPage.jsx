import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminListing, updateListingStatus } from "../../api/adminApi";
import "../seller/seller.css";

function AdminListingPage() {
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
  getAdminListing(id)
    .then((data) => setListing(data))
    .catch((err) => alert(err.message));
}, [id]);

function changeStatus(status) {
  updateListingStatus(id, status)
    .then(() => getAdminListing(id))
    .then((data) => setListing(data))
    .catch((err) => alert(err.message));
}

  if (!listing) {
    return <h3>Retrieving Listing Data...</h3>;
  }

  return (
    <div className="listing-details-page">
      <div className="listing-details-container">
        <div className="listing-details-image">
          {listing.photo && <img src={listing.photo} alt={listing.title} />}
        </div>

        <div className="listing-details-info">
          <h1>{listing.title}</h1>
          <h2>{listing.artist}</h2>

          <p className="listing-details-price">${listing.price.toFixed(2)}</p>

          <div className="listing-details-meta">
            <div className="listing-details">
              <p><strong>Seller:</strong> {listing.sellerName}</p>
              <p><strong>Media:</strong> {listing.mediaType}</p>
              <p><strong>Condition:</strong> {listing.condition}</p>
              <p><strong>Genre:</strong> {listing.genre}</p>
              <p><strong>Release Date:</strong> {listing.releaseDate}</p>
              <p><strong>Stock:</strong> {listing.stock}</p>
              <p><strong>Barcode:</strong> {listing.EAN}</p>
              <p><strong>Status:</strong> {listing.listingStatus}</p>
            </div>
          </div>
        </div>

        <div className="button-container">
          {listing.listingStatus === "active" && (
            <button type="button" className="back-button" onClick={() => changeStatus("deactivated")}>
              Deactivate Listing
            </button>
          )}
          {listing.listingStatus === "deactivated" && (
            <button type="button" className="back-button" onClick={() => changeStatus("active")}>
              Activate Listing
            </button>
          )}
          <button type="button" className="back-button" onClick={() => navigate("/admin/manage-listings")}>
            Back to Listings
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminListingPage;