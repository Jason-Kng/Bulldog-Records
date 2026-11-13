import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getActiveListings, updateListingStatus } from "../../api/adminApi";
import "./admin.css";
import "../seller/seller.css";

const STATUSES = ["active", "deactivated", "removed"];

function ManageListingsPage() {
  const [listings, setListings] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  function loadListings() {
    getActiveListings()
    .then((data) => setListings(data))
    .catch((err) => alert(err.message));
  }

  useEffect(() => {
    loadListings();
  }, []);

  function changeStatus(id, status) {
    updateListingStatus(id, status)
      .then(() => loadListings())
      .catch((err) => alert(err.message));
  }

  if (!listings) {
    return <h3>Retrieving Listings...</h3>;
  }

  const visibleListings =
    statusFilter === "all"
      ? listings
      : listings.filter((listing) => listing.listingStatus === statusFilter);


  return (
    <div className="listings-container">
      <h2>Manage Listings</h2>

      <div className="listings-buttons-container">
        <button
          type="button"
          className="seller-view-listings-button"
          onClick={() => navigate("/admin")}
        >
          My Dashboard
        </button>
      </div>

      <div className="seller-orders-buttons-container">
        <button
          type="button"
          className={`seller-view-orders-button ${statusFilter === "all" ? "active" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          All
        </button>

        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            className={`seller-view-orders-button ${statusFilter === status ? "active" : ""}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {visibleListings.length === 0 && <p>No listings found</p>}

      <div className="seller-listings-divider">
        <ul>
          {visibleListings.map((listing) => (
            <li
              key={listing.listingID}
              className={`listings-container-li ${listing.listingStatus}`}
            >
              


              <p className="listing-page-title">
                <Link to={`/admin/manage-listings/${listing.listingID}`}>
                {listing.title} - {listing.artist}
                </Link>
                </p>
              <p className="listing-page-stock">Seller: {listing.sellerName}</p>
              <p className="listing-page-stock">Stock: {listing.stock}</p>
              <p className={`listing-page-status ${listing.listingStatus}`}>
                Status: {listing.listingStatus}
              </p>

              <div className="users-buttons-container">
                {listing.listingStatus === "active" && (
                  <button
                    type="button"
                    className="manage-users-button"
                    onClick={() => changeStatus(listing.listingID, "deactivated")}
                  >
                    Deactivate
                  </button>
                )}
                {listing.listingStatus === "deactivated" && (
                  <button
                    type="button"
                    className="manage-users-button"
                    onClick={() => changeStatus(listing.listingID, "active")}
                  >
                    Activate
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageListingsPage;