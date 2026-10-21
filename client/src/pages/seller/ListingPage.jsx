import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { getListing, removeListing } from "../../api/sellerApi";

function ListingPage() {
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();

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
    <div class="listing-container">
      <h1>{listing.title}</h1>
      <p>Artist: {listing.artist}</p>
      <p>Release Date: {listing.releaseDate}</p>
      <p>Media Type: {listing.mediaType}</p>
      <p>Genre: {listing.genre}</p>
      <p>Barcode: {listing.EAN}</p>
      <p>Condition: {listing.condition}</p>
      <p>Stock: {listing.stock}</p>
      <p>Price: ${listing.price.toFixed(2)}</p>
      <p>Status: {listing.listingStatus}</p>

      <div class="listing-buttons-container">
       
        <Button text="Edit Listing" onClick={() => navigate(`/seller/listings/${id}/edit`)} />
        <Button text="Remove Listing" onClick={confirmRemove} />
        <Button text="My Listings" onClick={() => navigate(`/seller/listings`)} />
      </div>
    </div>

      

  )




}

export default ListingPage;


