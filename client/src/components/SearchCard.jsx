import { useNavigate } from 'react-router-dom';
import "./SearchCard.css"

function SearchCard({ listingID, seller, image, title, artist, price }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(id);
    navigate(`/listingDetails/${id}`)

  };

  return (
    <div className="search-card-container" onClick={() => handleClick(listingID)}>
      {image && < img src={`..${image}`} alt={title} className="search-card-image" />}
      <div className="search-card-content" id={listingID}>
        {title && <h2 className="search-card-title">{title}</h2>}
        {artist && <p className="search-card-artist">{artist}</p>}
        <div className='search-card-seller-info'>
          {seller && <p className="search-card-seller">Seller: {seller}</p>}
          {price && <p className="search-card-price">${(price / 100).toFixed(2)}</p>}
        </div>
      </div>
    </div>
  )
}

export default SearchCard;


