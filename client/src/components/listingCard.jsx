import { useNavigate } from 'react-router-dom';
import './listingCard.css';

function Card({ listingID, seller, image, title, artist, price }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(id);
    navigate(`/listingDetails/${id}`)

  };

  return (
    <div className="card-container" onClick={() => handleClick(listingID)}>
      {image && < img src={`..${image}`} alt={title} className="card-image" />}
      <div className="card-content" id={listingID}>
        {/* <div className='card-top-row'> */}
        {title && <h2 className="card-title">{title}</h2>}
        {artist && <p className="card-artist">{artist}</p>}
        {/* </div> */}
        <div className='card-bottom-row'>
          {seller && <p className="card-seller">Seller: {seller}</p>}
          {price && <p className="card-price">${(price / 100).toFixed(2)}</p>}
        </div>
      </div>
    </div>
  )
}

export default Card;


