import React from "react";

const Search = ({ search, searctInput, handleSearch }) => {
  return (
    <div className="Search">
      {/*  */}
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        ref={searctInput}
      />
    </div>
  );
};

export default Search;
