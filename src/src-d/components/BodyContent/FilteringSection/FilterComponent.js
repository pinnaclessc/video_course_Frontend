import React, { useState } from "react"
import mainData from "../maindata.json"
import classes from "./FilterComponent.module.css"
import { FaSearch } from "react-icons/fa"

export default function FilterComponents() {
  const [filteredData, setFilteredData] = useState(mainData)

  const handleSortingChange = (event) => {
    const selectedOption = event.target.value
    let sortedData = [...mainData]
    switch (selectedOption) {
      case "Recently Accessed":
        // Apply sorting logic for "Recently Accessed"
        break
      case "Recently Enrolled":
        // Apply sorting logic for "Recently Enrolled"
        break
      case "Title: A-To-Z":
        // Apply sorting logic for "Title: A-To-Z"
        break
      case "Title: Z-To-A":
        // Apply sorting logic for "Title: Z-To-A"
        break
      default:
        break
    }
    setFilteredData(sortedData)
  }

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value
    // Apply filtering logic based on selectedCategory
    const filteredData = mainData.filter((item) => {
      // Perform the necessary filtering logic based on selectedCategory
    })
    setFilteredData(filteredData)
  }

  const handleProgressChange = (event) => {
    const selectedProgress = event.target.value
    // Apply filtering logic based on selectedProgress
    const filteredData = mainData.filter((item) => {
      // Perform the necessary filtering logic based on selectedProgress
    })
    setFilteredData(filteredData)
  }

  const handleInstructorChange = (event) => {
    const selectedInstructor = event.target.value
    // Apply filtering logic based on selectedInstructor
    const filteredData = mainData.filter((item) => {
      // Perform the necessary filtering logic based on selectedInstructor
    })
    setFilteredData(filteredData)
  }

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase()
    // Filter the data based on the searchQuery
    const filteredData = mainData.filter((item) => {
      // Perform the necessary filtering logic based on searchQuery
    })
    setFilteredData(filteredData)
  }

  return (
    <>
      <div className={classes.sort}>
        <p>
          <b>Sorted By</b>
        </p>
        <p className={classes.filtered}>
          <b>Filtered By</b>
        </p>
      </div>
      <div className={classes.options}>
        <select
          className={classes.select}
          defaultValue="Recently Accessed"
          onChange={handleSortingChange}
        >
          <option>Recently Accessed</option>
          <option>Recently Enrolled</option>
          <option>Title: A-To-Z</option>
          <option>Title: Z-To-A</option>
        </select>

        <select
          className={classes.select1}
          defaultValue="Categories"
          onChange={handleCategoryChange}
        >
          <option>All Categories</option>
          <option>Marketing</option>
          <option>Photos & Videos</option>
          <option>IT And Softwares</option>
        </select>

        <select
          className={classes.select1}
          defaultValue="Progress"
          onChange={handleProgressChange}
        >
          <option>In Progress</option>
          <option>Completed</option>
          <option>Not Started</option>
        </select>

        <select
          className={classes.select1}
          defaultValue="Instructors"
          onChange={handleInstructorChange}
        >
          <option>Instructors</option>
          <option>Ramniwas Sir</option>
          <option>Rajesh Sir</option>
          <option>Rohit Sir</option>
          <option>Richa Madam</option>
          <option>Nisha Madam</option>
          <option>Sandeep Sir</option>
          <option>Uttam Sir</option>
          <option>Himanshu Sir</option>
        </select>
        <div>
          <button className={classes.reset_btn}>Reset</button>
        </div>
        <div className={classes.search_container}>
          <form className={classes.search} action="action_page.php">
            <input
              className={classes.input_search}
              type="text"
              placeholder="search my courses"
              name="search"
              onChange={handleSearchChange}
            />
            <div className={classes.searchbtn_container} type="submit">
              <FaSearch className={classes.searchbtn} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
