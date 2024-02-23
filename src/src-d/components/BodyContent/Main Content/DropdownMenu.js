import React from "react"
import classes from "./DropdownMenu.module.css"

const DropdownMenu = ({ handlePlayClick, onClose }) => {
  const handleDropdownItemClick = (link) => {
    console.log("Opening video link:", link)
    handlePlayClick(link)
    onClose() 
  }

  return (
    <div className={classes.dropdownMenu}>
      <ul>
        <li onClick={() => handleDropdownItemClick("item1 link")}>Item 1</li>
        <li onClick={() => handleDropdownItemClick("item2 link")}>Item 2</li>
      
      </ul>
    </div>
  )
}

export default DropdownMenu
