import React, { useState } from "react"
import classes from "./SubContentCard.module.css"

const SubContentCard = ({ title, items }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className={classes.subContentCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href="/">{title}</a>
      {isHovered && (
        <div className={classes.itemList}>
          {items.map((item) => (
            <a key={item} href="/">
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default SubContentCard
