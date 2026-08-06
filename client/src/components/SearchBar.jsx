import { FaSearch, FaTimes } from "react-icons/fa";
import "../styles/SearchBar.css";

function SearchBar({
  search,
  setSearch,
}) {

  return (

    <div className="search-container">

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search files by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />

        {search && (

          <button
            type="button"
            className="clear-search"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>

        )}

      </div>

    </div>

  );

}

export default SearchBar;