import { useState } from "react";
import Button from "../Button";


function AddListingForm({ onEnter, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    releaseDate: "",
    mediaType: "",
    genre: "",
    EAN: "",
    condition: "",
    stock: "",
    price: "",
    photo: "",
  });

  // handle submit function from documentation (https://react.dev/learn/reacting-to-input-with-state, https://react.dev/reference/react-dom/components/form)
  function handleSubmit(e) {
    e.preventDefault();
    onEnter(form); // call function from addlistingpage
  }

  // replace the whole object by creating a new one: https://react.dev/reference/react/useState
  // <input
  //         value={form.lastName}
  //         onChange={e => {
  //           setForm({
  //             ...form,
  //             lastName: e.target.value
  //           });
  //         }}
  //       />

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
        <input name="releaseDate" value={form.releaseDate} placeholder="year-month-day" onChange={handleChange} />
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
        <select name="genre" value={form.genre} onChange={handleChange}>
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
        <label>EAN: </label>
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
        <label>Photo </label>
        <input className="photo-upload" name="photo" type="file" accept="image/*" onChange={handleChange} />
      </p>

      <div class="add-listing-buttons-container">
        

        <Button text="Add Listing" type="submit" />
        <Button text="Cancel" onClick={onCancel} />
      </div>
    </form>

    
  );
}

export default AddListingForm;
