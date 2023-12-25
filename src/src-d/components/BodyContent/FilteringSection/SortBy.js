import React, { useState } from "react"

const SortByComponent = () => {
  const [sortOption, setSortOption] = useState("")

  const handleSortChange = (event) => {
    setSortOption(event.target.value)
  }

  // Function to sort the data based on the selected sort option
  const sortData = () => {
    // Implement your sorting logic here based on the selected sort option
    // Example: Sort data alphabetically by title
    if (sortOption === "az") {
      // Sort data in ascending order
    } else if (sortOption === "za") {
      // Sort data in descending order
    } else if (sortOption === "recent") {
      // Sort data based on recent enrollment
    }
    // Update your data state with the sorted data
  }

  return (
    <div>
      <div>
        <span>Sort By:</span>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="recent">Recently Enrolled</option>
          <option value="az">Title A-Z</option>
          <option value="za">Title Z-A</option>
        </select>
        <button onClick={sortData}>Sort</button>
      </div>
      <div>
        <span>Filter By:</span>
        {/* Add your filter options here */}
      </div>
      {/* Rest of the component */}
    </div>
  )
}

export default SortByComponent
