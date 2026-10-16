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
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>Title: </label>
        <input name="title" value={form.title} onChange={handleChange} />
      </p>
      <p>
        <label>Artist: </label>
        <input name="artist" value={form.artist} onChange={handleChange} />
      </p>
      <p>
        <label>Release Date: </label>
        <input name="releaseDate" value={form.releaseDate} onChange={handleChange} />
      </p>
      <p>
        <label>Media Type: </label>
        <select name="mediaType" value={form.mediaType} onChange={handleChange}>
          <option value="cd">CD</option>
          <option value="vinyl">Vinyl</option>
          <option value="cassette">Cassette</option>
          <option value="other">Other</option>
        </select>
      </p>
      <p>
        <label>Genre: </label>
        <input name="genre" value={form.genre} onChange={handleChange} />
      </p>
      <p>
        <label>EAN: </label>
        <input name="EAN" value={form.EAN} onChange={handleChange} />
      </p>
      <p>
        <label>Condition: </label>
        <select name="condition" value={form.condition} onChange={handleChange}>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="damaged">Damaged</option>
        </select>
      </p>
      <p>
        <label>Stock: </label>
        <input name="stock" value={form.stock} onChange={handleChange} />
      </p>
      <p>
        <label>Price: </label>
        <input name="price" value={form.price} onChange={handleChange} />
      </p>
      <p>
        <label>Photo path: </label>
        <input name="photo" value={form.photo} onChange={handleChange} />
      </p>

      <Button text="Add Listing" type="submit" />
      <Button text="Cancel" onClick={onCancel} />
    </form>
  );
}

export default AddListingForm;