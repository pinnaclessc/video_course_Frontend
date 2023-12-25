import React from "react"
import classes from "./SearchBar.module.css"
import { FaSearch } from "react-icons/fa"

function SearchBar() {
  return (
    <div className={classes.searchbox}>
      <div className={classes.inputbox}>
        <FaSearch className={classes.search_icon} />
        <input
          className={classes.productSearch}
          type="text"
          name="product-search"
          // id="product-search"
          placeholder="Search for anything"
        />
      </div>
    </div>
  )
}

export default SearchBar
