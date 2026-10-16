import { useNavigate } from "react-router-dom";
import AddListingForm from "../../components/seller/AddListingForm.jsx";
import { addListing } from "../../api/sellerApi";

function AddListingPage() {
  const navigate = useNavigate();

  function handleSubmit(form) {
    addListing(form)
      .then(() => navigate("/seller/listings"))
      .catch((err) => alert(err.message));
  }

  return (
    <div>
      <h1>Add Listing</h1>
      <AddListingForm
        onEnter={handleSubmit}
        onCancel={() => navigate("/seller/listings")}
      />
    </div>
  );
}

export default AddListingPage;
