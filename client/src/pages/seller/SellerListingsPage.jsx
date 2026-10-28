import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Button from "../../components/Button";
import { getListings } from "../../api/sellerApi";

import './seller.css';

function SellerListingsPage() {
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getListings()
      .then((data) => setListings(data))
      .catch((err) => alert(err.message));
  }, []);

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
          onClick={() => navigate("/seller/listings/add")}
        >
          Add Listing
        </button>
        {/* <Button text="My Account" onClick={() => navigate("/seller")}/>
        <Button text="Add Listing" onClick={() => navigate("/seller/listings/add")}/> */}
        
      </div>

      <div className="seller-listings-divider">
      
        <ul>
          {/* <h3>Pending</h3> */}
          {listings
          .filter((listing) => listing.listingStatus == "pending")
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



      
      <ul>
        {/* <h3>Active</h3> */}
        {listings
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


      </div>


    </div>
  )


}

export default SellerListingsPage;