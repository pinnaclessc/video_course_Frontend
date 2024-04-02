import React from "react"
import { FaSearch } from "react-icons/fa"
import classes from "./QandA.module.css"

function QandA() {
  return (
    <>
      <div className={classes.searchbox_container}>
        <div className={classes.searchbox}>
          <form className={classes.inputbox}>
            <input
              className={classes.input_Ques}
              type="text"
              name="q&a_search"
              id="q&a_search"
              placeholder="Search course content"
            />

            <div className={classes.icon_container}>
              <FaSearch className={classes.search_icon} size={30} />
            </div>
          </form>
        </div>
        <div className={classes.filter_sort_container}>
          <div className={classes.filter}>Filter: </div>
          {/* <p className={classes.sortby}>Sort by:</p> */}
          <div className={classes.filter1}>
            <select className={classes.dropdown1}>
              <option defaultValue="All Lectures">All Lectures</option>
              <option defaultValue="Current Lectures">Current Lectures</option>
            </select>
          </div>
          <div className={classes.sortby}>Sort by: </div>
          <div className={classes.sortby1}>
            <select className={classes.dropdown2}>
              <option defaultValue="All Lectures">Sort by most recent</option>
              <option defaultValue="Current Lectures">
                Sort by most upvoted
              </option>
              <option defaultValue="Current Lectures">
                Sort by most recommended
              </option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default QandA