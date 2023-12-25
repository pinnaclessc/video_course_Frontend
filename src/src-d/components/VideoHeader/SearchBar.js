import React from "react"
import "./SearchBar.css"
import { FaSearch } from "react-icons/fa"

function SearchBar() {
  return (
    <div className="container1">
      <div className="input-wrap">
        <FaSearch color="#5c5470" fontSize="0.8em" opacity="0.7" size={25} />
        <input
          type="text"
          name="product-search"
          id="product-search"
          placeholder="search for anything"
        />
      </div>
    </div>
  )
}

export default SearchBar
