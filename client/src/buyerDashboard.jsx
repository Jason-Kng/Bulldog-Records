import Card from './listingCard.jsx';
import placeholder from './assets/placeholder.png';
import './buyerDashboard.css';
import { useState, useEffect } from 'react';
import { getListings } from './api/dashboard.js';
function Buyer() {
  const [listings, setlistings] = useState([]);

  useEffect(() => {
    getListings()
      .then(data => { console.log(data); setlistings(data); })
      .catch(error => console.error('Error fetching listings: ', error));
  }, []);



  return (
    <>
      <div>
        <div className='listing-section'>
          <h2>Featured Listings</h2>
          <div className='listing-scroll'>
            {listings.map((listing) => (
              <Card key={listing.listingID} listingID={listing.listingID} image={placeholder} title={listing.title} artist={listing.artist} price={listing.price} seller={listing.sellerID} />
            ))}

          </div>
        </div>
      </div>

    </>
  );
}
export default Buyer;
