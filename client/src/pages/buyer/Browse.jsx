import Card from '../../components/ListingCard.jsx';
// import placeholder from '../../assets/placeholder.png';
import './Browse.css';
import { useState, useEffect } from 'react';
import { getListings } from '../../api/listingApi.js';

function Browse() {
  const [listings, setlistings] = useState([]);

  useEffect(() => {
    getListings()
      .then(data => { setlistings(data); })
      .catch(error => console.error('Error fetching listings: ', error));
  }, []);

  return (
    <>
      <div>
        <div className='listing-section'>
          <h2>Featured Listings</h2>
          <div className='listing-scroll'>
            {listings.map((listing) => (
              <Card key={listing.listingID} listingID={listing.listingID} image={listing.photo} title={listing.title} artist={listing.artist} price={listing.price} seller={listing.name} />
            ))}

          </div>
        </div>
      </div>

    </>
  );
}
export default Browse;
