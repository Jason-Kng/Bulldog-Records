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
        <label>Title *</label>
        <input name="title" value={form.title} onChange={handleChange} required/>
      </p>
      <p>
        <label>Artist *</label>
        <input name="artist" value={form.artist} onChange={handleChange} required/>
      </p>
      <p>
        <label>Release Date</label>
        <input name="releaseDate" value={form.releaseDate} placeholder="YYYY-MM-DD" onChange={handleChange}/>
      </p>
      <p>
        <label>Media Type *</label>
        <select name="mediaType" value={form.mediaType} onChange={handleChange} required>
          <option value="select">Select</option>
          <option value="cd">CD</option>
          <option value="vinyl">Vinyl</option>
          <option value="cassette">Cassette</option>
          <option value="other">Other</option>
        </select>
      </p>
      <p>
        <label>Genre *</label>
        <select name="genre" value={form.genre} onChange={handleChange} required>
          <option value="select">Select</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="r&b">R&B</option>
          <option value="disco">Disco</option>
          <option value="classic">Classic</option>
          <option value="soul">Soul</option>
          <option value="jazz">Jazz</option>
          <option value="blues">Blues</option>
          <option value="country">Country</option>
          <option value="folk">Folk</option>
          <option value="indie">Indie</option>
          <option value="alternative">Alternative</option>
          <option value="metal">Metal</option>
          <option value="punk">Punk</option>
          <option value="funk">Funk</option>
          <option value="reggae">Reggae</option>
          <option value="latin">Latin</option>
          <option value="reggaeton">Reggaeton</option>
          <option value="electronic">Electronic</option>
          <option value="techno">Techno</option>
          <option value="house">House</option>
          <option value="soundtrack">Soundtrack</option>
          <option value="gospel">Gospel</option>
          <option value="world">World Music</option>
          <option value="new-age">New Age</option>
          <option value="rap">Rap</option>
          <option value="other">Other</option>
        </select>
      </p>
      <p>
        <label>EAN (13 digits)</label>
        <input name="EAN" type="text" pattern="\d{13}" value={form.EAN} onChange={handleChange} />
      </p>
      <p>
        <label>Condition *</label>
        <select name="condition" value={form.condition} onChange={handleChange} required>
          <option value="select">Select</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="open">Open</option>
        </select>
      </p>
      <p>
        <label>Stock *</label>
        <input name="stock" type="number" min={1} max={100} value={form.stock} onChange={handleChange} required/>
      </p>
      <p>
        <label>Price *</label>
        <input name="price" type="number" value={form.price} onChange={handleChange} required/>
      </p>
      <p>
        <label>Photo </label>
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


