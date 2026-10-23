import { useNavigate } from "react-router-dom";
import AddListingForm from "../../components/seller/AddListingForm.jsx";
import { addListing } from "../../api/sellerApi";
import './seller.css';

function AddListingPage() {
  const navigate = useNavigate();

  function handleSubmit(form) {
    addListing(form)
      .then(() => navigate("/seller/listings"))
      .catch((err) => alert(err.message));
  }

  return (
    <div className="add-listing-form-container">
      <h2>Add Listing</h2>
      <div className="add-listing-form">
        <AddListingForm
          onEnter={handleSubmit}
          onCancel={() => navigate("/seller/listings")}
        />
      </div>
    </div>
  );
}

export default AddListingPage;
