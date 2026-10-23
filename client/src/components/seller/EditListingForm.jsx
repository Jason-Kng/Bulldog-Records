import { useState } from "react";
import Button from "../Button";

function EditListingForm({ listing, onEnter, onCancel }) {
  const [form, setForm] = useState({
    ...listing, // listing's current values
    releaseDate: listing.releaseDate || "",
    EAN: listing.EAN || "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onEnter(form); // call function from addlistingpage
  }

  // pdates the field
  function handleChange(e) {
    // firstName: e.target.value

    if (e.target.type === "file") {

      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>Title </label>
        <input name="title" value={form.title} onChange={handleChange} />
      </p>
      <p>
        <label>Artist </label>
        <input name="artist" value={form.artist} onChange={handleChange} />
      </p>
      <p>
        <label>Release Date </label>
        <input name="releaseDate" value={form.releaseDate} onChange={handleChange} />
      </p>
      <p>
        <label>Media Type </label>
        <select name="mediaType" value={form.mediaType} onChange={handleChange}>
          <option value="select">Select</option>
          <option value="cd">CD</option>
          <option value="vinyl">Vinyl</option>
          <option value="cassette">Cassette</option>
          <option value="other">Other</option>
        </select>
      </p>
      <p>
        <label>Genre </label>
        <input name="genre" value={form.genre} onChange={handleChange} />
      </p>
      <p>
        <label>EAN </label>
        <input name="EAN" value={form.EAN} onChange={handleChange} />
      </p>
      <p>
        <label>Condition </label>
        <select name="condition" value={form.condition} onChange={handleChange}>
          <option value="select">Select</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="damaged">Damaged</option>
        </select>
      </p>
      <p>
        <label>Stock </label>
        <input name="stock" value={form.stock} onChange={handleChange} />
      </p>
      <p>
        <label>Price </label>
        <input name="price" value={form.price} onChange={handleChange} />
      </p>
      <p>
        <label>Photo path </label>
        <input className="photo-upload" name="photo" type="file" accept="image/*" onChange={handleChange} />
      </p>

      <div class="edit-listing-buttons-container">
        <Button text="Save" type="submit" />
        <Button text="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
}

export default EditListingForm;


