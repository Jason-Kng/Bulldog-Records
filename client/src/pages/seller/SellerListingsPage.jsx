import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Button from "../../components/Button";
import { getListings, getSellerAccountInfo } from "../../api/sellerApi";

import './seller.css';

function SellerListingsPage() {
  const [listings, setListings] = useState([]);
  const [seller, setSeller] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getListings()
      .then((data) => setListings(data))
      .catch((err) => alert(err.message));

    getSellerAccountInfo()
    .then((data) => setSeller(data))
    .catch((err) => alert(err.message));
  }, []);

  const deactivatedListings = listings.filter((l) => l.listingStatus == "deactivated");
  const pendingListings = listings.filter((l) => l.listingStatus == "pending");
  const activeListings = listings.filter((l) => l.listingStatus == "active");

  return (
    <div class="listings-container">
      <h2>My Listings</h2>

      <div class="listings-buttons-container">
        {/* <button
            type="button"
            className="seller-view-listings-button"
            onClick={() => navigate("/seller/")}
          >
            My Account
        </button> */}
        <button
          type="button"
          className="seller-view-listings-button"
          onClick={() => navigate("/seller")}
        >
          My Account
        </button>
        <button
          type="button"
          className="seller-view-listings-button"
          disabled={!seller || seller.accountStatus !== "active" || seller.approvalStatus == "pending" || seller.approvalStatus == "rejected"}
          onClick={() => navigate("/seller/listings/add")}
        >
          Add Listing
        </button>
        {/* <Button text="My Account" onClick={() => navigate("/seller")}/>
        <Button text="Add Listing" onClick={() => navigate("/seller/listings/add")}/> */}
        
      </div>


      {seller && seller.accountStatus !== "active" && (
        <p className="error-message">Your account is {seller.accountStatus}. You cannot create new listings. Active listings will not be shown to customers.</p>
      )}

      {seller && (seller.approvalStatus == "pending") && (
        <p className="error-message">Your account approval status is {seller.approvalStatus}. You cannot create new listings.</p>
      )}

      {seller && seller.approvalStatus == "rejected" && (
        <p className="error-message">Your seller account was {seller.approvalStatus}.</p>
      )}



      <div className="seller-listings-divider">
        {deactivatedListings.length > 0 && (
        <ul>
          {/* <h3>Pending</h3> */}
          {deactivatedListings
          .filter((listing) => listing.listingStatus == "deactivated")
          .map((listing) => (
            <li key={listing.listingID} className="listings-container-li canceled">
              <Link to={`/seller/listings/${listing.listingID}`}>
                  <div class="listing-page-header-container">
                    <p class="listing-page-title">{listing.title}</p>
                    <div class="status-container">
                      <div className="status-circle canceled"></div>
                      <p
                        className="listing-page-status canceled"
                      >
                        {listing.listingStatus}
                    </p>
                    
                    </div>
                  
                  </div>
                  
                  <p class="listing-page-stock">Stock: {listing.stock}</p>
                  <p class="listing-page-price">Price: ${listing.price}</p>

              </Link>
              

            </li>
          ))}
        </ul>
        )}
      {pendingListings.length > 0 && (
        <ul>
          {/* <h3>Pending</h3> */}
          {pendingListings
          .filter((listing) => listing.listingStatus == "pending")
          .map((listing) => (
            <li key={listing.listingID} className={`listings-container-li ${
                          listing.listingStatus?.toLowerCase() === "pending"
                            ? "pending"
                            : "canceled"
                        }`}>
              <Link to={`/seller/listings/${listing.listingID}`}>
                  <div class="listing-page-header-container">
                    <p class="listing-page-title">{listing.title}</p>
                    <div class="status-container">
                      <div className={`status-circle ${
                          listing.listingStatus?.toLowerCase() === "active"
                            ? "active"
                            : "pending"
                        }`}></div>
                      <p
                        className={`listing-page-status ${
                          listing.listingStatus?.toLowerCase() === "active"
                            ? "active"
                            : "pending"
                        }`}
                      >
                        {listing.listingStatus}
                    </p>
                    
                    </div>
                  
                  </div>
                  
                  <p class="listing-page-stock">Stock: {listing.stock}</p>
                  <p class="listing-page-price">Price: ${listing.price}</p>

              </Link>
              

            </li>
          ))}
        </ul>
      )}



      {activeListings.length > 0 && (
      <ul>
        {/* <h3>Active</h3> */}
        {activeListings
        .filter((listing) => listing.listingStatus == "active")
        .map((listing) => (
          <li key={listing.listingID} className={`listings-container-li ${
                        listing.listingStatus?.toLowerCase() === "active"
                          ? "active"
                          : "pending"
                      }`}>
            <Link to={`/seller/listings/${listing.listingID}`}>
                <div class="listing-page-header-container">
                  <p class="listing-page-title">{listing.title}</p>
                  <div class="status-container">
                    <div className={`status-circle ${
                        listing.listingStatus?.toLowerCase() === "active"
                          ? "active"
                          : "pending"
                      }`}></div>
                    <p
                      className={`listing-page-status ${
                        listing.listingStatus?.toLowerCase() === "active"
                          ? "active"
                          : "pending"
                      }`}
                    >
                      {listing.listingStatus}
                  </p>
                  
                  </div>
                 
                </div>
                
                <p class="listing-page-stock">Stock: {listing.stock}</p>
                <p class="listing-page-price">Price: ${listing.price}</p>

            </Link>
            

          </li>
        ))}
      </ul>
      )}


      </div>


    </div>
  )


}

export default SellerListingsPage;