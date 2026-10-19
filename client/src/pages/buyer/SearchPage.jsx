import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


function Search() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("query");

  useEffect(() => {
    // search db
    // output result
  })

  if (search) {
    return (
      <>
        <h2>Search Results for "{search}"</h2>
        <div>
        </div>
      </>
    );
  }

  return (
    <>
      <h2>No Search Results Found for "{search}"</h2>
      <div>
      </div>
    </>
  );
};

export default Search;

