import React from "react";

function Search({ handleSearchOnChange }) {
  return (
    <div>
      <label htmlFor="search-bar">Search</label>
      <input type="text" id="search-bar" onChange={handleSearchOnChange} />
    </div>
  );
}

export default Search;
