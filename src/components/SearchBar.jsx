import React from "react";

function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by book title..."
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
