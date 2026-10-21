import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditListingForm from "../../components/seller/EditListingForm";
import { getListing, updateListing } from "../../api/sellerApi";

function EditListingPage () {
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    getListing(id)
      .then((data) => setListing(data))
      .catch((err) => alert(err.message));
  }, [id]);

  function handleSubmit(form) {
    updateListing(id, form)
      .then(() => navigate(`/seller/listings/${id}`))
      .catch((error) => alert(error.message));
  }


  if (!listing) {
    return <h3>Retrieving Listing Data...</h3>;
  }

  return (
    <div>
      <h1>Edit Listing {listing.id}</h1>
      <EditListingForm 
        listing={listing}
        onEnter={handleSubmit}
        onCancel={() => navigate(`/seller/listings/${id}`)}
      />
    </div>
  );

}

export default EditListingPage;