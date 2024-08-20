import React, { useState } from "react";
import { ISearchBar } from "../../interfaces/ISearchBar";

const SearchBar: React.FC<ISearchBar> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: { target: { value: string } }) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div>
      <input
        className="form-control mb-3 w-25 border border-dark"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
