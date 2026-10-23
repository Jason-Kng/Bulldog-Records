import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { getListings } from "../../api/sellerApi";

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
      <h1>My Listings</h1>

      <div class="listings-buttons-container">
        <Button text="My Account" onClick={() => navigate("/seller")}/>
        <Button text="Add Listing" onClick={() => navigate("/seller/listings/add")}/>
        
      </div>
      


      <ul>
        {listings.map((listing) => (
          <li key={listing.listingID}>
            <Link to={`/seller/listings/${listing.listingID}`}>
                <div class="listing-page-header-container">
                  <p class="listing-page-title">{listing.title}</p>
                  <div class="status-container">
                    <div class="status-circle"></div>
                    <p
                      className={`listing-page-status ${
                        listing.listingStatus?.toLowerCase() === "active"
                          ? "active"
                          : ""
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
  )


}

export default SellerListingsPage;