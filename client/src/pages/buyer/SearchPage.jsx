import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchListings } from "../../api/listingApi";
import SearchCard from "../../components/SearchCard";
import "./SearchPage.css"


function Search() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("query");
  const [listings, setListings] = useState([]);
  const [loadedSearch, setLoadedSearch] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    searchListings(search)
      .then(data => {
        console.log("Client data: ", data);
        setListings(data);
        setLoadedSearch(search)
      });
  }, [search]);

  const loading = search && loadedSearch !== search;

  // if (search && listings.length) {
  //   return (
  //     <>
  //       <div>
  //         <div className='listing-section'>
  //           <h2>Search Listings</h2>
  //           <div className='search-results'>
  //             {listings.map((listing) => (
  //               <SearchCard key={listing.listingID} listingID={listing.listingID} image={listing.photo} title={listing.title} artist={listing.artist} price={listing.price} seller={listing.name} />
  //             ))}
  //
  //           </div>
  //         </div>
  //       </div>
  //
  //
  //     </>
  //   );
  // }

  if (!search || search.trim() === "") {
    return (
      <div className="listing-section">
        <h2>Search Listings</h2>
        <p>Enter a search term.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="listing-section">
        <h2>Search Listings</h2>
        <p>Loading search result ...</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="listing-section">
        <h2>Search Listings</h2>
        <p>No listings found for "{search}".</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className='listing-section'>
          <h2>Search Listings</h2>
          <div className='search-results'>
            {listings.map((listing) => (
              <SearchCard key={listing.listingID} listingID={listing.listingID} image={listing.photo} title={listing.title} artist={listing.artist} price={listing.price} seller={listing.name} />
            ))}

          </div>
        </div>
      </div>


    </>
  );
};

export default Search;

